import React, { useState, useEffect } from "react";
import  Link  from "react-router-dom";
import  AddToCart  from "../cart";
import  Rating  from "@mui/material";
import useAuth from "../../hooks/useAuth";

const SingleProductCard = ({ product }) => {
  const [value, setValue] = useState(0);
  const { searchItems } = useAuth();

  useEffect(() => {
    function getValue() {
      setValue(product.overallRating);
    }
    getValue();
  }, [searchItems]);

  return (
    <span className="single-product">
      <span className="single-product-details">
        <span>
          <Link
            to={`/product/${product.id}`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img
              className="card--image"
              src={product.image}
              alt={`${product.name} amiibo image`}
            />
          </Link>
        </span>
      </span>
      <span className="product-card-labels">
        <h3>{product.name}</h3>
        {value ? (
          <Rating name="read-only" value={value} precision={0.5} readOnly />
        ) : product.variation ? (
          <h4>{product.variation}</h4>
        ) : (
          <h4>-----</h4>
        )}
        <p>{product.game}</p>
        <h5>
          {product.inventory > 0 ? product.price : "Temporarily out of stock"}
        </h5>
      </span>
      <span className="single-product-buttons">
        <Link
          to={`/product/${product.id}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }} 
        >
          <button className="button--more-info">More Info</button>
        </Link>
        <AddToCart className="button--add-to-cart" product={product} quantity={1} />
      </span>
    </span>
  );
};

export default SingleProductCard;
