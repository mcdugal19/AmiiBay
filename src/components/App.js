import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { AllProducts } from "./products";
import { Cart } from "./cart";
import { Admin } from "./admin";
import useAuth from "../hooks/useAuth";

import SingleProductCard from "./products/SingleProductCard";
import { Login, Register } from "./";
import { NavBar } from "./navbar";
import { Checkout } from "./checkout";
import catMario from './images/Cat Mario.jpg'
const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const { user, isLoggedIn } = useAuth();
  const [username, setUsername ] = useState("");
  return (
    <div className="app-container">
      <header>
      <h1 className="Title" >Amiibos</h1>
      {isLoggedIn ? (
          <div className="is-logged-in">
            <img className="user-icon" src={catMario} alt="user icon" />
            {username}
          </div>
        ) : null}
      </header>
      
      <NavBar />
      {/* <p>API Status: {APIHealth}</p> */}
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/singleProduct" element={<SingleProductCard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;
