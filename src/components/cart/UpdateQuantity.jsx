import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { updateItemQuantity } from "../../axios-services";

const UpdateQuantity = ({ item }) => {
  const { isLoggedIn, cart, setCart } = useAuth();
  const [updateQuantity, setUpdateQuantity] = useState(item.quantity);

  async function handleSubmit(e) {
    e.preventDefault();
    if (item.quantity === updateQuantity) {
      return;
    }
    if (updateQuantity <= item.inventory) {
      if (isLoggedIn) {
        try {
          const response = await updateItemQuantity(item.id, updateQuantity);
          if (response.message === "Successfully updated quantity!") {
            const filteredCart = cart.map((product) => {
              if (product.id === item.id) {
                product.quantity = +updateQuantity;
                return product;
              } else {
                return product;
              }
            });
            setCart(filteredCart);
            toast(response.message);
          } else {
            toast(response.message);
          }
        } catch (error) {
          throw error;
        }
      } else {
        const filteredGuestCart = cart.map((product) => {
          if (product.id === item.id) {
            product.quantity = +updateQuantity;
            return product;
          } else {
            return product;
          }
        });
        setCart(filteredGuestCart);
        toast("Successfully updated quantity!");
      }
    } else {
      toast.error("Sorry, we can't sell you more than we have :/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        min="1"
        step="1"
        value={updateQuantity}
        onChange={(e) => {
          setUpdateQuantity(e.target.value);
        }}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateQuantity;
