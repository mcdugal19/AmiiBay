import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import "../style/App.css";
import useAuth from "../hooks/useAuth";
import { AllProducts, SingleProduct } from "./products";
import { Cart, SuccessPage } from "./cart";
import { Admin } from "./admin";
import { Login, Register } from "./";
import { NavBar } from "./navbar";
import { Checkout } from "./checkout";
import catMario from "./images/Cat Mario Icon.png";
import { UserProfile } from "./userProfile";

const App = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="app-container">
      <ToastContainer />
      <header>
        <h1 className="Title">AmiiBay</h1>
        {isLoggedIn ? (
          <div className="is-logged-in">
            <Link to={"/me"}>{user.username}</Link>
            <img className="user-icon" src={catMario} alt="user icon" />
          </div>
        ) : null}
       
      </header>
      
      <NavBar />

      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
};

export default App;
