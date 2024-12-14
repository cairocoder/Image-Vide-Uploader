// frontend/src/components/FileList.js

import React from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const FileList = ({ files, setFiles }) => {
    const { token } = React.useContext(AuthContext);

    const handleShare = async (fileId) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/files/share/${fileId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigator.clipboard.writeText(res.data.sharedLink);
            alert("Shareable link copied to clipboard");
        } catch (err) {
            alert(
                err.response?.data?.message || "Failed to generate share link"
            );
        }
    };

    return (
        <div>
            <h3>Your Files</h3>
            <ul>
                {files.map((file) => (
                    <li key={file._id}>
                        {file.fileType === "image" ? (
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${file.filepath}`}
                                alt={file.filename}
                                width="100"
                            />
                        ) : (
                            <video
                                width="100"
                                controls
                                src={`${process.env.REACT_APP_API_URL}/${file.filepath}`}
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <p>{file.filename}</p>
                        <button onClick={() => handleShare(file._id)}>
                            Share
                        </button>
                        <p>Views: {file.viewCount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
