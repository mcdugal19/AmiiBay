import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Logout } from "./";
import cartIcon from "../../images/cartIcon.png";

const NavBar = () => {
  const { user, isLoggedIn, cart } = useAuth();
  const [cartQuantity, setCartQuantity] = useState(0);

  // Function to track the total amount of items in the cart
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

  // Everytime cart is updated, it will recalculate the cart total.
  useEffect(() => {
    getCartTotal();
  }, [cart]);

  return (
    <nav className="navbar">
      <div className="button-container-home">
        <div className="button-home">
          <Link to={"/"}>Home</Link>
        </div>
      </div>

      {user.isAdmin ? (
        <div className="button-container-admin">
          <div className="button-admin">
            <Link to={"/admin"}>Admin</Link>
          </div>
        </div>
      ) : null}
      {!isLoggedIn ? (
        <>
          <div className="button-container-login">
            <div className="button-login">
              <Link to={"/login"}>Login</Link>
            </div>
          </div>
          <div className="button-container-register">
            <div className="button-register">
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </>
      ) : (
        <div className="button-container-logout">
          <div className="button-logout">
            <Logout />
          </div>
        </div>
      )}
      <div className="button-container-cart">
        <div className="button-cart">
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
