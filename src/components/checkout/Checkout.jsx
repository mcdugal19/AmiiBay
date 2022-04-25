import React, { useState, useEffect } from "react";
import { CartItem } from "../cart";
import useAuth from "../../hooks/useAuth";

const Checkout = () => {
  const { cart } = useAuth();
  const [total, setTotal] = useState(0);
  const [clicked, setClicked] = useState(false);

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
    <span className="container">
      <br></br>
      <form>
        <br></br>
        <label className="shipping">Shipping Info</label>

        <input type="text" placeholder="Address Line 1"></input>

        <input type="text" placeholder="Address Line 2"></input>

        <input type="text" placeholder="Address Line 3"></input>
        <br></br>
        <br></br>
        <label>Payment Method</label>
        <input type="text" placeholder="Credit Card Company"></input>
        <input type="text" placeholder="Name On Card"></input>
        <input type="text" placeholder="Credit Card Number"></input>
        <br></br>
        
        
        <br></br>
        <button className="Checkout-button" type="submit" >
          Place Your Order
        </button>
        <br></br>
        <br></br>
        <label>Review Items</label>
        <br></br>
      </form>
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
    </span>
  );
};

export default Checkout;
