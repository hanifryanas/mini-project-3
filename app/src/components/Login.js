import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleusername = (e) => {
        const val = e.target.value;
        setUsername(val);
    };

    const handlePassword = (e) => {
        const val = e.target.value;
        setPassword(val);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
        };
        axios.post('http://localhost:3100/auth/login', user)
            .then((res) => {
                if (res?.data?.access_token) {
                    const accessToken = `Bearer ${res.data.access_token}`;
                    localStorage.setItem("accessToken", accessToken);
                    if (user.username === "admin") {
                        window.location.href = "/admin";
                    } else {
                        window.location.href = "/";
                    }
                }
                else {
                    alert("Incorrect username/email or password");
                    window.location.href = "/login";
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div className="login-container">
            <h2>Login Menu</h2>
            <form onSubmit={handleLogin}>
                <input
                    value={username}
                    onChange={handleusername}
                    type="text"
                    placeholder="username"
                ></input>
                <input
                    value={password}
                    onChange={handlePassword}
                    type="password"
                    placeholder="password"
                ></input>
                <button className="login-button" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;