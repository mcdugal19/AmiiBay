import React from "react";
import useAuth from "../../hooks/useAuth";
import { clearAllItemsInCart } from "../../axios-services";

const ClearCart = () => {
  const { isLoggedIn, setCart, user } = useAuth();

  async function handleClick() {
    const text = "Are you sure you want to clear your cart?";
    if (confirm(text)) {
      if (isLoggedIn) {
        try {
          const response = await clearAllItemsInCart();
          if (
            response.message === `Successfully cleared ${user.username}'s cart!`
          ) {
            setCart([]);
            alert(response.message);
          } else {
            console.error(response);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setCart([]);
        alert("Successfully cleared guest's cart!");
      }
    }
  }

  return <button onClick={handleClick}>Clear Cart</button>;
};

export default ClearCart;
