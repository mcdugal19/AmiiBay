import React from "react";
import SingleProductCard from "./SingleProductCard";
import useAuth from "../../hooks/useAuth";

const AllProducts = () => {
  const { products } = useAuth();

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
