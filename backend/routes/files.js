// backend/routes/files.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const auth = require("../middleware/auth");
const File = require("../models/File"); // Ensure File model is correctly defined
const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() + "-" + crypto.randomBytes(6).toString("hex");
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only images and videos are allowed"));
    }
};

const upload = multer({ storage, fileFilter });

// Upload File
router.post("/upload", auth, upload.single("file"), async (req, res) => {
    const { tags } = req.body;
    try {
        const file = new File({
            userId: req.user,
            filename: req.file.filename,
            filepath: req.file.path,
            fileType: req.file.mimetype.startsWith("image") ? "image" : "video",
            tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        });
        await file.save();
        res.status(201).json({ message: "File uploaded successfully", file });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Generate Shareable Link
router.post("/share/:id", auth, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        if (file.userId.toString() !== req.user)
            return res.status(401).json({ message: "Unauthorized" });

        if (!file.sharedLink) {
            file.sharedLink = crypto.randomBytes(16).toString("hex");
            await file.save();
        }

        res.json({
            sharedLink: `${process.env.BASE_URL}/api/files/shared/${file.sharedLink}`,
        });
    } catch (error) {
        console.error("Share error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Access Shared File
router.get("/shared/:sharedLink", async (req, res) => {
    try {
        const file = await File.findOne({ sharedLink: req.params.sharedLink });
        if (!file) return res.status(404).json({ message: "File not found" });

        file.viewCount += 1;
        await file.save();

        res.sendFile(path.resolve(file.filepath));
    } catch (error) {
        console.error("Access shared file error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// **New Route: Get All Files for Authenticated User**
router.get("/", auth, async (req, res) => {
    try {
        const files = await File.find({ userId: req.user }).sort({
            createdAt: -1,
        });
        res.json({ files });
    } catch (error) {
        console.error("Fetch files error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
