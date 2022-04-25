import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { CartItem, ClearCart } from "./";

const Cart = () => {
  const { cart, user, isLoggedIn } = useAuth();
  const [clicked, setClicked] = useState(false);
  const [total, setTotal] = useState(0);

  function handleClick() {
    setClicked(!clicked);
  }

  function getTotal() {
    const prices = cart.map((item) => {
      return +item.price.slice(1) * item.quantity;
    });
    const newTotal = prices.reduce(
      (partialTotal, current) => partialTotal + current,
      0
    );

    // Because JS is bad at decimals.
    setTotal(Math.round((newTotal + Number.EPSILON) * 100) / 100);
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
          {isLoggedIn ? (
            <h2>{`${user.username}'s Cart`}</h2>
          ) : (
            <h2>Guest's Cart</h2>
          )}
          <br />
          <button onClick={handleClick}>Ready to Checkout?</button>
          {clicked ? <small>I was clicked!</small> : null}
          <ClearCart />
          <div className="cart-container">
            <table>
              <tbody>
                <tr>
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
        </>
      )}
    </div>
  );
};

export default Cart;
