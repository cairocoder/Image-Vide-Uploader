// frontend/src/pages/Dashboard.js

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/files`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setFiles(res.data.files);
            } catch (err) {
                if (err.response?.status === 401) {
                    logout();
                    navigate("/login");
                }
                alert(err.response?.data?.message || "Failed to fetch files");
            }
        };
        fetchFiles();
    }, [token, logout, navigate]);

    const handleUploadSuccess = (newFile) => {
        setFiles([newFile, ...files]);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <FileUpload onUpload={handleUploadSuccess} />
            <FileList files={files} setFiles={setFiles} />
        </div>
    );
};

export default Dashboard;
