const express = require("express");
const cartRouter = express.Router();
const { Cart, Products } = require("../db");
const { authRequired } = require("./utils");

// Post route to add a product to cart database and sends back the product info.
cartRouter.post("/", authRequired, async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const cartEntry = await Cart.addToCart({
      userId: req.user.id,
      productId,
      quantity,
    });
    if (cartEntry.id) {
      const product = await Products.getProductById(cartEntry.productId);
      product.quantity = cartEntry.quantity;
      res.send({
        message: "Successfully added item to cart!",
        cartItem: product,
      });
    } else {
      next({ name: "CartError", message: "Error adding item to cart!" });
    }
  } catch (error) {
    next(error);
  }
});

// Route to update a item that is in the cart.
cartRouter.patch("/:productId", authRequired, async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cartUpdate = await Cart.changeProductQuantity({
      userId: req.user.id,
      productId,
      quantity,
    });

    if (cartUpdate.id) {
      const product = await Products.getProductById(cartUpdate.productId);
      product.quantity = cartUpdate.quantity;

      res.send({
        message: "Successfully updated quantity!",
        cartItem: product,
      });
    } else {
      next({
        name: "CartQuantityError",
        message: "Error updating the product quantity!",
      });
    }
  } catch (error) {
    next(error);
  }
});

// Route to remove a specific item from the cart.
cartRouter.delete("/:productId", authRequired, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const removedItem = await Cart.removeFromCart(req.user.id, productId);

    if (removedItem.id) {
      const product = await Products.getProductById(removedItem.productId);
      product.quantity = removedItem.quantity;

      res.send({
        message: "Successfully removed item from cart!",
        cartItem: product,
      });
    } else {
      next({
        name: "CartRemovalError",
        message: "Error removing item from cart!",
      });
    }
  } catch (error) {
    next(error);
  }
});

// Route to remove every item from the cart.
cartRouter.delete("/", authRequired, async (req, res, next) => {
  try {
    const clearedCart = await Cart.clearUserCart(req.user.id);

    if (clearedCart) {
      res.send({
        message: `Successfully cleared ${req.user.username}'s cart!`,
      });
    } else {
      next({
        name: "CartClearingError",
        message: `Error clearing ${req.user.username}'s cart!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
