import React from "react";
import { toast } from "react-toastify";
import { deleteReview } from "../../axios-services";

const DeleteReview = ({ reviewId, reviews, setReviews }) => {
  async function handleClick() {
    try {
      const deletedResponse = await deleteReview(reviewId);
      if (deletedResponse.message === "Successfully deleted review!") {
        const filteredReviews = reviews.filter((review) => {
          return review.id !== reviewId;
        });
        setReviews(filteredReviews);
        toast(deletedResponse.message);
      } else {
        toast.error(deletedResponse.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <button className="delete-review-button" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteReview;
