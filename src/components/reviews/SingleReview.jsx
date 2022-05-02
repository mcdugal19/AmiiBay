// This component displays the review-card on the Single-Product information page.

import React, { useState, useEffect } from "react";
import  Rating  from "@mui/material";
import  DeleteReview  from "./";
import useAuth from "../../hooks/useAuth";

const SingleReview = ({ review, reviews, setReviews, product }) => {
  const [value, setValue] = useState(0);
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    function getValue() {
      setValue(review.rating);
    }
    getValue();
  }, []);

  return (
    <span className="review-card">
      <h4>{review.title}</h4>
      <h5>Reviewer: {review.author.username}</h5>
      <Rating name="read-only" value={value} size="small" readOnly />
      <br />
      <p>{review.post}</p>
      {isLoggedIn ? (
        user.id === review.author.userId || user.isAdmin ? (
          <DeleteReview
            reviewId={review.id}
            reviews={reviews}
            setReviews={setReviews}
            product={product}
          />
        ) : null
      ) : null}
    </span>
  );
};

export default SingleReview;
