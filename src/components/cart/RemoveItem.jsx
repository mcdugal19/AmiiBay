// This component is responsible for removing an item from the User's cart.

import React from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { removeItemFromCart } from "../../AJAXFunctions";

const RemoveItem = ({ item }) => {
  const { isLoggedIn, cart, setCart } = useAuth();

  async function handleClick() {
    if (isLoggedIn) {
      try {
        const response = await removeItemFromCart(item.id);
        if (response.message === "Successfully removed item from cart!") {
          const filteredCart = cart.filter((product) => {
            return product.id !== response.cartItem.id;
          });
          toast(response.message);
          setCart(filteredCart);
        } else {
          toast(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const filteredGuestCart = cart.filter((product) => {
        return product.id !== item.id;
      });
      toast("Successfully removed item from cart!");
      setCart(filteredGuestCart);
    }
  }

  return <button onClick={handleClick}>Remove</button>;
};

export default RemoveItem;
