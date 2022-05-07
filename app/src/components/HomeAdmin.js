import React from "react";
import "./HomeAdmin.css";
import AddUser from "./AddUser";
import Container from "./Container";

const HomeAdmin = () => {
    return (
        <div className="home-admin-container">
            <h2>Welcome Admin !</h2>
            <Container />
        </div>
    );
}

export default HomeAdmin;