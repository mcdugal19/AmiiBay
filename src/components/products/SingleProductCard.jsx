import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "../cart";

const SingleProductCard = ({ product }) => {
  return (
    <span className="single-product">
      <span className="single-product-details">
        <span>
          <Link to={`/product/${product.id}`}>
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
        {product.variation ? <h4>{product.variation}</h4> : <h4>-----</h4>}
        <p>{product.game}</p>
        <h5>
          {product.inventory > 0 ? product.price : "Temporarily out of stock"}
        </h5>
      </span>
      <span className="single-product-buttons">
        <Link to={`/product/${product.id}`}>
          <button className="button--more-info">More Info</button>
        </Link>
        <AddToCart product={product} quantity={1} />
      </span>
    </span>
  );
};

export default SingleProductCard;
