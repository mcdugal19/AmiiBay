const apiRouter = require("express").Router();
const usersRouter = require("./users");
// enable stripe
const stripe = require("stripe")(process.env.SECRET_KEY);
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

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "test1" }],
  [2, { priceInCents: 20000, name: "test2" }],
]);

apiRouter.post("/create-checkout-session", async (req, res, next) => {
  try {
    console.log(req.body.items);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/`,
      cancel_url: `${process.env.SERVER_URL}/`,
    });
    console.log("getting here");
    res.send({ url: session.url });
  } catch (error) {
    next(error);
  }
});

// place your routers here
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);
const checkoutRouter = require("./checkout");
apiRouter.use("/checkout", checkoutRouter);
const cartRouter = require("./cart");
apiRouter.use("/cart", cartRouter);
const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);

module.exports = apiRouter;
