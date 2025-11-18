import express, { Request, Response, NextFunction } from "express";
const productsRouter = express.Router();
import { Products } from "../db";
import { adminRequired } from "./utils";

// Route that sends back product information from every product.
productsRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Products.getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Admin only route that will add a new product to the database. Sends back success message / product info.
productsRouter.post("/", adminRequired, async (req: Request, res: Response, next: NextFunction) => {
  const { productObj } = req.body;
  const { name, variation, game, image, description, price, inventory } =
    productObj;
  if (!name || !price || !inventory) {
    next({
      name: "RequiredFields",
      message:
        "Products must at least have a name, price, and inventory amount.",
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
        inventory,
      });

      res.send({ message: "Successfully added product!", product });
    } catch (error) {
      next(error);
    }
  }
});

// Admin only route to update a specific product's information.
productsRouter.patch("/:productId", adminRequired, async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  const { name, variation, game, image, description, price, inventory } =
    req.body;

  // build update object with index signature to allow dynamic properties
  const updateObj: { [key: string]: any } = { id: productId };
  if (name) updateObj.name = name;
  if (variation) updateObj.variation = variation;
  if (game) updateObj.game = game;
  if (image) updateObj.image = image;
  if (description) updateObj.description = description;
  if (price) updateObj.price = price;
  if (inventory) updateObj.inventory = inventory;

  try {
    const product = await Products.updateProduct(updateObj);

    res.send({ message: "Successfully updated product!", product });
  } catch (error) {
    next(error);
  }
});

// Admin only route to delete a specific product from the database.
productsRouter.delete("/:productId", adminRequired, async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params;
  try {
    const product = await Products.deleteProduct(Number(productId));

    res.send({
      message: "Product successfully deleted from the database.",
      product,
    });
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
