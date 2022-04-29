const express = require("express");
const reviewsRouter = express.Router();
const { Reviews } = require("../db");
const { authRequired, adminRequired } = require("./utils");

reviewsRouter.post("/", authRequired, async (req, res, next) => {
  const { productId, title, post, rating } = req.body;
  if (!title || !post) {
    next({
      name: "RequiredFields",
      message: "Reviews must at have a title, post.",
    });
  }
  if (rating < 1) {
    next({
      name: "RatingRangeError",
      message: "Ratings are between 1 and 5 stars :)",
    });
  }
  try {
    const check = await Reviews.userReviewExists(req.user.id, productId);
    if (check) {
      next({
        name: "ReviewLimitReached",
        message: "Only one review per customer per product allowed.",
      });
    } else {
      const review = await Reviews.createReview({
        productId,
        userId: req.user.id,
        title,
        post,
        rating,
      });

      review.author = { userId: review.userId, username: req.user.username };
      delete review.productId;

      res.send({ message: "Successfully posted review!", review });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
