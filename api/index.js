const apiRouter = require("express").Router();
const usersRouter = require("./users");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
  next();
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use("/users", usersRouter);

// place your routers here
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

module.exports = apiRouter;
