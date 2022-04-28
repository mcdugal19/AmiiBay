import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AddToCart } from "../cart";

const SingleProduct = () => {
  const { searchItems } = useAuth();
  let { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [product] = searchItems.filter((item) => {
    return item.id == productId;
  });

  return (
    <div className="single-product-page">
      <div className="single-product-container">
        <span>
          <h2>{product.name}</h2>
          {product.variation ? <h3>{product.variation}</h3> : <h3>-----</h3>}
          <h4>{product.game}</h4>
          <p>{product.description}</p>
          <h5>{product.price}</h5>
        </span>
        <img src={product.image} alt={`${product.name} amiibo image`} />
      </div>
      <span className="single-product-add-button">
        <h6>
          {product.inventory > 0
            ? `${product.inventory} currently in stock!`
            : "Temporarily out of stock!"}
        </h6>
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
    </div>
  );
};

export default SingleProduct;
