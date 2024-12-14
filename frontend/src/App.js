// frontend/src/App.js

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SharedFile from "./pages/SharedFile";

const PrivateRoute = ({ children }) => {
    const { token } = React.useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/shared/:sharedLink"
                        element={<SharedFile />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
