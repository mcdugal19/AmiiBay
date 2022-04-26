import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "../cart";

const SingleProductCard = ({ product }) => {
  return (
    <span className="single-product">
      <span className="single-product-details">
      <span>
        <h3>{product.name}</h3>
        {product.variation ? <h4>{product.variation}</h4> : <h4>-----</h4>}
        <p>{product.game}</p>
      </span>
      <span>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={`${product.name} amiibo image`}
          />
        </Link>
        <h5>{product.price}</h5>
        </span>
      </span>
      <span>
        <Link to={`/product/${product.id}`}>
          <button>More Info</button>
        </Link>
        <AddToCart product={product} quantity={1} />
      </span>
    </span>
  );
};

export default SingleProductCard;
