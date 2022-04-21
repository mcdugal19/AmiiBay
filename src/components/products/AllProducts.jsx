import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../../axios-services";
import SingleProductCard from "./SingleProductCard";

const AllProducts = () => {
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
    <div className="container">
      <div className="all-products-page">
      {/* <Search routines={routines} setRoutines={setRoutines} /> */}
        {products.map((product, idx) => {
          return <SingleProductCard key={idx} product={product} />;
        })}
      </div>
    </div>
  );
};

export default AllProducts;
