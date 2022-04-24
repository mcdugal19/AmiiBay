import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { UpdateQuantity, RemoveItem } from "./";

const Cart = () => {
  const { cart, user, isLoggedIn } = useAuth();
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <div className="cart-page">
      {isLoggedIn ? (
        <h2>{`${user.username}'s Cart`}</h2>
      ) : (
        <h2>Guest's Cart</h2>
      )}
      <br />
      <button onClick={handleClick}>Ready to Checkout?</button>
      {clicked ? <small>I was clicked!</small> : null}
      <div className="cart-container">
        <table>
          <tbody>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Update?</th>
              <th>Remove?</th>
            </tr>
            {cart.map((item, idx) => {
              return (
                <tr className="cart-item" key={`cart-item-${idx}`}>
                  <td>
                    <span>
                      <span>
                        <h3>{item.name}</h3>
                        <h4>{item.variation ? item.variation : "-----"}</h4>
                      </span>
                      <span>
                        <img
                          src={item.image}
                          width={"50px"}
                          height={"75px"}
                          alt={`${item.name} amiibo image`}
                        />
                        <h5>{item.price}</h5>
                      </span>
                    </span>
                  </td>

                  <td>{item.quantity}</td>
                  <td>
                    <UpdateQuantity item={item} />
                  </td>
                  <td>
                    <RemoveItem item={item} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
