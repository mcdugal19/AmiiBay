const apiRouter = require("express").Router();

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

const checkoutRouter = require("./checkout");
apiRouter.use("/checkout", checkoutRouter);

const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);

const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);

module.exports = apiRouter;
