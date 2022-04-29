import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";

const SingleReview = ({ review }) => {
  const [value, setValue] = useState(0);

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
    </span>
  );
};

export default SingleReview;
