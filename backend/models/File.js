// backend/models/File.js

const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    filepath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        enum: ["image", "video"],
        required: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    sharedLink: {
        type: String,
        unique: true,
        sparse: true,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("File", FileSchema);
