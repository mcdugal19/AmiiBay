const apiRouter = require("express").Router();

const usersRouter = require("./users");
// enable stripe
const stripe = require("stripe")(process.env.SECRET_KEY);
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

apiRouter.post("/create-checkout-session", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        item.price = Math.round((+item.price.slice(1) + Number.EPSILON) * 100);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cart`,
    });
    res.send({ url: session.url });
  } catch (error) {
    next(error);
  }
});



module.exports = apiRouter;
