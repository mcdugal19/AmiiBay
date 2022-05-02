import React from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { clearAllItemsInCart } from "../../AJAXFunctions";

const ClearCart = () => {
  const { isLoggedIn, setCart, user } = useAuth();

  async function handleClick() {
    if (isLoggedIn) {
      try {
        const response = await clearAllItemsInCart();
        if (
          response.message === `Successfully cleared ${user.username}'s cart!`
        ) {
          setCart([]);
          toast(response.message);
        } else {
          console.error(response);
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setCart([]);
      toast("Successfully cleared guest's cart!");
    }
  }

  return <button onClick={handleClick}>Clear Cart</button>;
};

export default ClearCart;
