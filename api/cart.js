const express = require("express");
const cartRouter = express.Router();
const { Cart, Products } = require("../db");
const { authRequired } = require("./utils");

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

module.exports = cartRouter;
