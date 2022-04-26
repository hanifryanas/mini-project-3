import React from "react";
import { useState, useEffect } from "react";
import "./HomeAdmin.css";

const HomeAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    //get the products from the database
    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            });
    }, []);

    return (
        isAdmin ? (
            <>
                <div className="container">
                    <h2>You are logged in!</h2>
                    <h1>Welcome {user.name}</h1>
                </div>
            </>
        ) : (
            <>
                <div className="container">
                    <h2>You are not an admin!</h2>
                </div>
            </>
        )
    );
}