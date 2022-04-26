import React, { useState } from "react";
import axios from "axios";
import "./Logout.css";

const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        window.location.href = "/";
    };
    return (
        <div className="logout-container" >
            <h2 className="animated-logout" onAnimationEnd={handleLogout}>You are loggged out</h2>
        </div>
    )
}

export default Logout;