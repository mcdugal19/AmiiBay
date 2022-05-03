// This component is responsible for the detailed description view of each Amiibo product in the listing.

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AddToCart } from "../cart";
import { SingleReview, ReviewForm } from "../reviews";
import { Rating } from "@mui/material";

const SingleProduct = () => {
  const { products, isLoggedIn } = useAuth();
  let { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState(0);

  const [product] = products.filter((item) => {
    return item.id == productId;
  });

  useEffect(() => {
    function getValue() {
      if (product !== undefined) {
        setValue(product.overallRating);
      }
    }
    getValue();
  }, []);

  useEffect(() => {
    function getReviews() {
      if (product !== undefined) {
        setReviews(product.reviews);
      }
    }
    getReviews();
  }, [setReviews]);

  return (
    <>
      {product !== undefined ? (
        <div className="single-product-page">
          <div className="single-product-container">
            <span className="single-product-info">
              <h2 className="single-product-name">{product.name}</h2>
              {product.variation ? <h3>{product.variation}</h3> : null}
              {value ? (
                <Rating
                  name="read-only"
                  value={value}
                  precision={0.5}
                  size="large"
                  readOnly
                />
              ) : null}
              <br />
              <h4>{product.game}</h4>
              <p>{product.description}</p>
              <h6>
                {product.inventory > 0
                  ? `${product.inventory} currently in stock!`
                  : "Temporarily out of stock!"}
              </h6>
              <h5 className="single-product-price">{product.price}</h5>
              <span className="single-product-add-button">
                <input
                  type="number"
                  min={"1"}
                  step={"1"}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
                <AddToCart product={product} quantity={quantity} />
              </span>
            </span>
            <img
              className="single-product-page-image"
              src={product.image}
              alt={`${product.name} amiibo image`}
            />
          </div>
          <div className="reviews-container">
            {isLoggedIn ? (
              <span className="review-form-container">
                <h4>
                  We'd love to hear your thoughts on this {product.name} amiibo!
                </h4>
                <ReviewForm
                  productId={product.id}
                  reviews={reviews}
                  setReviews={setReviews}
                />
              </span>
            ) : (
              <h4>Log in to leave a review!</h4>
            )}
            {reviews.length > 0 ? (
              reviews.map((review, idx) => {
                return (
                  <SingleReview
                    key={`review-${idx}`}
                    review={review}
                    reviews={reviews}
                    setReviews={setReviews}
                    product={product}
                  />
                );
              })
            ) : (
              <h4>No Reviews Yet!</h4>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SingleProduct;
