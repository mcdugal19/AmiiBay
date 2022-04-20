const express = require("express");
const productsRouter = express.Router();
const { Products } = require("../db");
const { authRequired } = require("./utils");

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await Products.getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", authRequired, async (req, res, next) => {
  const { name, variation, game, image, description, price } = req.body;
  if (!name || !price) {
    next({
      name: "RequiredFields",
      message: "Products must at least have a name and price.",
    });
  } else {
    try {
      const product = await Products.createProduct({
        name,
        variation,
        game,
        image,
        description,
        price,
      });
      res.send(product);
    } catch (error) {
      next(error);
    }
  }
});

productsRouter.get("/:game", async (req, res, next) => {
  const { game } = req.params;
  try {
    const products = await Products.getProductsByGame(game);
    if (products.length > 0) {
      res.send(products);
    } else {
      next({
        name: "ProductsNotAvailable",
        message: "There are no available amiibos for that game.",
      });
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:productId", authRequired, async (req, res, next) => {
  const { productId } = req.params;
  const { name, variation, game, image, description, price } = req.body;

  // build update object
  const updateObj = { id: productId };

  if (name) {
    updateObj.name = name;
  }
  if (variation) {
    updateObj.variation = variation;
  }
  if (game) {
    updateObj.game = game;
  }
  if (image) {
    updateObj.image = image;
  }
  if (description) {
    updateObj.description = description;
  }
  if (price) {
    updateObj.price = price;
  }

  try {
    const updatedProduct = await Products.updateProduct(updateObj);
    if (updatedProduct) {
      updatedProduct.message = "Successfully updated product!";
      res.send(updatedProduct);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", authRequired, async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Products.deleteProduct(productId);
    deletedProduct.message = "Product successfully deleted from the database.";
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
