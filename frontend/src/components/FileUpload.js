// frontend/src/components/FileUpload.js

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const FileUpload = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState("");
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("tags", tags);

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/files/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onUpload(res.data.file);
            setFile(null);
            setTags("");
            alert("File uploaded successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*,video/*"
                required
            />
            <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
