const express = require("express");
const cartRouter = express.Router();
const { Cart, Products } = require("../db");
const { authRequired, adminRequired } = require("./utils");

cartRouter.post("/", authRequired, async (req, res, next) => {
  const { productId, quantity } = req.params;

  if (typeof quantity !== "number") {
    quantity = 1;
  }

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

cartRouter.delete("/admin/:userId", adminRequired, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const clearedCart = await Cart.clearUserCart(userId);
    if (clearedCart) {
      res.send({
        message: "Successfully cleared user's cart!",
      });
    } else {
      next({
        name: "CartClearingError",
        message: "Error clearing user's cart!",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
