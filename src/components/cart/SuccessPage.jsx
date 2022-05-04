// This is the redirect page after the Stripe checkout is complete.

import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { clearAllItemsInCart, addItemToOrders } from "../../AJAXFunctions";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { setCart, cart, user, setOrders, isLoggedIn } = useAuth();
  let navigate = useNavigate();

  async function clearCart() {
    try {
      const response = await clearAllItemsInCart();
      if (
        response.message === `Successfully cleared ${user.username}'s cart!`
      ) {
        setCart([]);
        setTimeout(() => navigate("/"), 2000);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function addOrder() {
    if (isLoggedIn) {
      try {
        if (cart.length > 0) {
          let newArr = await cart.map(async (product) => {
            let response = await addItemToOrders({
              productId: product.id,
              quantity: product.quantity,
            });
            return await response.cartItem;
          });
          setOrders([newArr]);
          await clearCart();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setCart([]);
      setTimeout(() => navigate("/"), 2000);
    }
  }

  useEffect(() => {
    console.log(isLoggedIn);
    addOrder();
  }, [isLoggedIn]);

  return (
    <>
      <h1>Thanks for shopping at AmiiBay !</h1>
      <h2>Redirecting to homepage...</h2>
    </>
  );
};

export default SuccessPage;
