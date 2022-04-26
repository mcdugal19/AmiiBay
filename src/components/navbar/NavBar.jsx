import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Logout } from "./";
import cartIcon from "../../images/cartIcon.png";

const NavBar = () => {
  const { user, isLoggedIn, cart } = useAuth();
  const [cartQuantity, setCartQuantity] = useState(0);

  function getCartTotal() {
    const itemNums = cart.map((item) => {
      return item.quantity;
    });
    const cartTotal = itemNums.reduce(
      (partialTotal, current) => partialTotal + current,
      0
    );

    setCartQuantity(cartTotal);
  }

  useEffect(() => {
    getCartTotal();
  }, [cart]);

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
            Cart{" "}
            <img
              id="cart-icon"
              src={cartIcon}
              width={"25px"}
              height={"25px"}
              alt="cart icon"
            />
            ({cartQuantity})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
