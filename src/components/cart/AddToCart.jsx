import React from "react";
import useAuth from "../../hooks/useAuth";
import { addItemToCart, updateItemQuantity } from "../../axios-services";
import cart from "../../images/cart.png";
const AddToCart = ({ product, quantity }) => {
  const { isLoggedIn, cart, setCart } = useAuth();

  async function handleClick() {
    let checkCart = cart.filter((item) => {
      return item.id === product.id;
    });
    if (checkCart.length === 0) {
      if (isLoggedIn) {
        try {
          const response = await addItemToCart({
            productId: product.id,
            quantity,
          });
          if (response.message === "Successfully added item to cart!") {
            setCart([...cart, response.cartItem]);
            alert(response.message);
          } else {
            console.error(response);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        let item = product;
        item.quantity = quantity;
        setCart([...cart, item]);
        alert("Successfully added item to cart!");
      }
    } else {
      if (isLoggedIn) {
        try {
          const response = await updateItemQuantity(
            checkCart[0].id,
            checkCart[0].quantity + 1
          );
          if (response.message === "Successfully updated quantity!") {
            const filteredCart = cart.map((product) => {
              if (product.id === checkCart[0].id) {
                product.quantity++;
                return product;
              } else {
                return product;
              }
            });
            setCart(filteredCart);
            alert("Increased quantity of item already in cart");
          } else {
            alert(response.message);
          }
        } catch (error) {
          throw error;
        }
      } else {
        const filteredGuestCart = cart.map((product) => {
          if (product.id === checkCart[0].id) {
            product.quantity++;
            return product;
          } else {
            return product;
          }
        });
        setCart(filteredGuestCart);
        alert("Increased quantity of item already in cart");
      }
    }
  }

  return (
    <button className="button--add-to-cart" onClick={handleClick}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
