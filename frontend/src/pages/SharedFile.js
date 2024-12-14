// frontend/src/pages/SharedFile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SharedFile = () => {
    const { sharedLink } = useParams();
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const fetchSharedFile = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/files/shared/${sharedLink}`,
                    {
                        responseType: "blob",
                    }
                );
                const url = URL.createObjectURL(res.data);
                setFileUrl(url);
            } catch (err) {
                alert(
                    err.response?.data?.message || "Failed to load shared file"
                );
            }
        };
        fetchSharedFile();
    }, [sharedLink]);

    if (!fileUrl) return <p>Loading...</p>;

    return (
        <div>
            {fileUrl.endsWith(".mp4") ||
            fileUrl.endsWith(".mov") ||
            fileUrl.endsWith(".avi") ||
            fileUrl.endsWith(".mkv") ? (
                <video width="600" controls src={fileUrl}>
                    Your browser does not support the video tag.
                </video>
            ) : (
                <img src={fileUrl} alt="Shared File" width="600" />
            )}
        </div>
    );
};

export default SharedFile;
