const express = require("express");
const ordersRouter = express.Router();
const { Orders, Products } = require("../db");
const { authRequired } = require("./utils");

// Route to add an item to the order history table after purchase, returns product info.
ordersRouter.post("/", authRequired, async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const orderEntry = await Orders.addToOrders({
      userId: req.user.id,
      productId,
      quantity,
    });
    if (orderEntry.id) {
      const product = await Products.getProductById(orderEntry.productId);
      product.quantity = orderEntry.quantity;
      res.send({
        message: "Successfully ordered item!",
        cartItem: product,
      });
    } else {
      next({ name: "OrderError", message: "Error adding item to order" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
