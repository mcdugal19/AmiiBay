const apiRouter = require("express").Router();
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);
// apiRouter.get("/", (req, res, next) => {
//   res.send({
//     message: "API is under construction!",
//   });
//   next();
// });

// apiRouter.get("/health", (req, res, next) => {
//   res.send({
//     healthy: true,
//   });
// });



// place your routers here
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);
const checkoutRouter = require("./checkout");
apiRouter.use("/checkout", checkoutRouter);
const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);

module.exports = apiRouter;
