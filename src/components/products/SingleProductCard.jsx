import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddToCart } from "../cart";

const SingleProductCard = ({ product }) => {
  return (
    <span className="single-product">
      <span>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        {product.variation ? <h4>{product.variation}</h4> : <h4>-----</h4>}
        <p>{product.game}</p>
      </span>
      <span>
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            width={"100px"}
            height={"100px"}
            alt={`${product.name} amiibo image`}
          />
        </Link>
        <h5>{product.price}</h5>
      </span>
      <AddToCart product={product} quantity={1} />
    </span>
  );
};

export default SingleProductCard;
