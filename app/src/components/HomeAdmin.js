import React, {useState} from "react";
import "./HomeAdmin.css";
import UserContainer from "./UserContainer";
import Container from "./Container";

const HomeAdmin = () => {
    const [isUserSetting, setIsUserSetting] = useState(false);

    return (
        <div className="home-admin-container">
            <h2>Welcome Admin !</h2>
            {isUserSetting ? 
            <>
                <button className="add-user-btn" onClick={() => setIsUserSetting(false)}>Home Admin</button> 
                <UserContainer/> 
            </>
            :
            <>
            <button className="add-user-btn" onClick={()=>setIsUserSetting(true)}>Setting User</button>
            <Container />
            </>
            }
        </div>
    );
}

export default HomeAdmin;