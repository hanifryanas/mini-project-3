import React from "react";
import "./HomeAdmin.css";
import AddUser from "./AddUser";
import TableContainer from "./TableContainer";

const HomeAdmin = () => {
    
    return (
        <div className="home-admin-container">
            <h2>Welcome Admin !</h2>
            <TableContainer />
        </div>
    );
}

export default HomeAdmin;