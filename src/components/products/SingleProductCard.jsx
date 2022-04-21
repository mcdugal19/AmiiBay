import React, { useState } from "react";


const SingleProductCard = ({ product, idx }) =>{

return (
    <span key={`all-amiibos[${idx}]`} className="single-product" >
      <span>
        <h3>{product.name}</h3>
        {product.variation ? (
          <h4>{product.variation}</h4>
        ) : (
          <h4>-----</h4>
        )}
        <p>{product.game}</p>
      </span>
      <span>
        <img src={product.image} width={"100px"} height={"100px"} alt={`${product.name} amiibo image`} />
        <h5>{product.price}</h5>
      </span>
    </span>
  );}

  export default SingleProductCard;