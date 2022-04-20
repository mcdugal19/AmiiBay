const express = require("express");
const productsRouter = express.Router();
const { Products } = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Products.getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
