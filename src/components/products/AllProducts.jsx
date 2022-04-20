import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../../axios-services";

const AllProducts = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const amiibos = await fetchAllProducts();
        setProducts(amiibos);
      } catch (error) {
        throw error;
      }
    }

    getProducts();
  }, []);

  return (
    <div className="all-products-page">
      {products.map((product, idx) => {
        return (
          <span key={`all-amiibos[${idx}]`} className="single-product">
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
              <img src={product.image} alt={`${product.name} amiibo image`} />
              <h5>{product.price}</h5>
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default AllProducts;
