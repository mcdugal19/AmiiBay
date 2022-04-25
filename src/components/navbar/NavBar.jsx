import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Logout } from "./";
import cart from "../../images/cart.png";

const NavBar = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <nav className="navbar">
      <Link to={"/"}>Home</Link>
      {user.isAdmin ? <Link to={"/admin"}>Admin</Link> : null}
      {!isLoggedIn ? (
        <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      ) : (
        <Logout />
      )}
      <Link to={"/cart"}>Cart
        <img
          id="cart-icon"
          src={cart}
          width={"25px"}
          height={"25px"}
          alt="cart icon"
        />
      </Link>
    </nav>
  );
};

export default NavBar;
