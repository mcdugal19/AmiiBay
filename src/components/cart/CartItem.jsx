// This component is responsible for rending the item and it's description on the cart page.

import React from "react";
import { UpdateQuantity, RemoveItem } from "./";

const CartItem = ({ item }) => {
  return (
    <tr className="cart-item">
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
};

export default CartItem;
