// This component houses all of the routing for the Cart page and its form.

import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { CartItem, ClearCart } from "./";
import { createCheckOut } from "../../AJAXFunctions";

const Cart = () => {
  const { cart, user, isLoggedIn } = useAuth();
  const [total, setTotal] = useState(0);

  function getTotal() {
    const prices = cart.map((item) => {
      return +item.price.slice(1) * item.quantity;
    });
    const newTotal = prices.reduce(
      (partialTotal, current) => partialTotal + current,
      0
    );

    // Because JS is bad at decimals.
    setTotal((Math.round((newTotal + Number.EPSILON) * 100) / 100).toFixed(2));
  }

  async function handleClick() {
    await createCheckOut(cart);
  }

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <div className="cart-page">
      {cart.length === 0 ? (
        <h2>Cart is empty!</h2>
      ) : (
        <>
          <div className="name-price">
            {isLoggedIn ? (
              <h2>{`${user.username}'s Cart`}</h2>
            ) : (
              <h2>Guest's Cart</h2>
            )}
            <h3>Total Price: {`$${total}`}</h3>
          </div>
          <br />
          <div className="checkout-clear">
          <button onClick={handleClick} className="checkout-button">
            Ready to Checkout?
          </button>
          <ClearCart />
          </div>
          <div className="cart-container">
            <table>
              <tbody>
                <tr className="cart-headers">
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Update Quantity?</th>
                  <th>Remove?</th>
                </tr>
                {cart.map((item, idx) => {
                  return <CartItem key={`cart-item-${idx}`} item={item} />;
                })}
              </tbody>
            </table>
            <h4>Total Price: {`$${total}`}</h4>
          </div>
          <br />
          <button onClick={handleClick} className="checkout-button">
            Ready to Checkout?
          </button>
          <br></br>
          <br></br>
        </>
      )}
    </div>
  );
};

export default Cart;
