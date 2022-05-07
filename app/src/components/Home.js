import React, { useState, useEffect } from 'react';
import "./Home.css";
import atob from 'atob';
import ProductCard from './ProductCard';


const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    updateUserLogin();
  }, []);

  const updateUserLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      setUser(JSON.parse(atob(accessToken.split(".")[1])));
    }
  }

  return (
    isLoggedIn ?
      <>
        <div className="container">
          <h2>Welcome {user.username} !</h2>
          <ProductCard/>
        </div>
      </>
      :
      <>
        <div className="container">
          <h2>You are not logged in!</h2>
          <h1>Please log in to see the products</h1>
        </div>
      </>
  )
}


export default Home