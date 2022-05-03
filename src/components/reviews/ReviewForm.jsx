// This component is rendered on the Single-Product more information page and is responsible for allowing a user to add a review to a single product. All fields MUST be completed.

import React, { useState } from "react";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import { addReview } from "../../AJAXFunctions";
import useAuth from "../../hooks/useAuth";

const ReviewForm = ({ productId, reviews, setReviews }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [rating, setRating] = useState(0);
  const { products, setProducts } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const reviewResponse = await addReview({
        productId,
        title,
        post,
        rating,
      });
      if (reviewResponse.message === "Successfully posted review!") {
        toast(reviewResponse.message);
        setReviews([reviewResponse.review, ...reviews]);
        const modifiedProducts = products.map((item) => {
          if (item.id === productId) {
            item.reviews.push(reviewResponse.review);
            return item;
          } else {
            return item;
          }
        });
        setProducts(modifiedProducts);
        setTitle("");
        setPost("");
        setRating(0);
      } else {
        toast.error(reviewResponse.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(e) => {
          setRating(+e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Review Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Review Post"
        value={post}
        onChange={(e) => {
          setPost(e.target.value);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
