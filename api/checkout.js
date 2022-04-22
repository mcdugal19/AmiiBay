const express = require("express");
const checkoutRouter = express.Router();
const { Checkout } = require("../db");
const { authRequired } = require("./utils");




checkoutRouter.post("/checkout", async (req, res, next) => {
    try {
      const order = await Checkout.createUser_Order();
      res.send(order);
    } catch (error) {
      next(error);
    }
  });

  module.exports = checkoutRouter;