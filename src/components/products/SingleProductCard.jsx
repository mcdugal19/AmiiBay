import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const SingleProductCard = ({ product, idx }) =>{
    const { token, user, isLoggedIn } = useAuth();
    const [products, setProducts] = useState([]);

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
        <img src={product.image} width={100} height={100} alt={`${product.name} amiibo image`} />
        <h5>{product.price}</h5>
      </span>
    </span>
  );}

  export default SingleProductCard;