const express = require("express");
const checkoutRouter = express.Router();
const { Checkout } = require("../db");
const { authRequired } = require("./utils");




checkoutRouter.post("/checkout", async (req, res, next) => {
    const { userId, productId } = req.body;
    try {
      const order = await Checkout.createUser_Order({ userId, productId});
      res.send(order);
    } catch (error) {
      next(error);
    }
  });

  module.exports = checkoutRouter;