import express, { Request, Response, NextFunction } from "express";
const apiRouter = express.Router();

// Enables stripe
import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY!);

// Routes /api/users to the specific user route.
import usersRouter from "./users";
apiRouter.use("/users", usersRouter);

// Routes /api/products to the specific product route.
import productsRouter from "./products";
apiRouter.use("/products", productsRouter);

// Routes /api/cart to the specific cart route.
import cartRouter from "./cart";
apiRouter.use("/cart", cartRouter);

// Routes /api/orders to the specific order route.
import ordersRouter from "./orders";
apiRouter.use("/orders", ordersRouter);

// Routes /api/reviews to the specific review route.
import reviewsRouter from "./reviews";
apiRouter.use("/reviews", reviewsRouter);

// Route that will generate a unique stripe checkout session. Also will handle moving the user after successful/unsuccessful checkout.
apiRouter.post(
  "/create-checkout-session",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map((item: any) => {
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
  }
);

export default apiRouter;
