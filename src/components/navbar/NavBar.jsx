import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Logout } from "./";
import cartIcon from "../../images/cartIcon.png";

const NavBar = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <nav className="navbar">
      <div className="button-container">
        <div className="button">
          <Link to={"/"}>Home</Link>
        </div>
      </div>

      {user.isAdmin ? (
        <div className="button-container">
          <div className="button">
            <Link to={"/admin"}>Admin</Link>
          </div>
        </div>
      ) : null}
      {!isLoggedIn ? (
        <>
          <div className="button-container">
            <div className="button">
              <Link to={"/login"}>Login</Link>
            </div>
          </div>
          <div className="button-container">
            <div className="button">
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </>
      ) : (
        <div className="button-container">
          <div className="button">
            <Logout />
          </div>
        </div>
      )}
      <div className="button-container">
        <div className="button">
          <Link to={"/cart"}>
            Cart
            <img
              id="cart-icon"
              src={cartIcon}
              width={"25px"}
              height={"25px"}
              alt="cart icon"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
