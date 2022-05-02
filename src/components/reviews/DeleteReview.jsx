import React from "react";
import { toast } from "react-toastify";
import { deleteReview } from "../../AJAXFunctions";
import useAuth from "../../hooks/useAuth";

const DeleteReview = ({ reviewId, reviews, setReviews, product }) => {
  const { products, setProducts } = useAuth();

  async function handleClick() {
    try {
      const deletedResponse = await deleteReview(reviewId);
      if (deletedResponse.message === "Successfully deleted review!") {
        const filteredReviews = reviews.filter((review) => {
          return review.id !== reviewId;
        });
        setReviews(filteredReviews);
        const modifiedProducts = products.map((item) => {
          if (item.id === product.id) {
            item.reviews = filteredReviews;
            return item;
          } else {
            return item;
          }
        });
        setProducts(modifiedProducts);
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
