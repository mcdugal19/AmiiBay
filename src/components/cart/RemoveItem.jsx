import React from "react";
import useAuth from "../../hooks/useAuth";
import { removeItemFromCart } from "../../axios-services";

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
          alert(response.message);
          setCart(filteredCart);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const filteredGuestCart = cart.filter((product) => {
        return product.id !== item.id;
      });
      alert("Successfully removed item from cart!");
      setCart(filteredGuestCart);
    }
  }

  return <button onClick={handleClick}>Remove</button>;
};

export default RemoveItem;
