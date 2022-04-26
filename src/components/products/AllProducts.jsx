import React from "react";
import SingleProductCard from "./SingleProductCard";
import SearchProducts from "./SearchProducts";
import useAuth from "../../hooks/useAuth";

const AllProducts = () => {
  const { products, setProducts } = useAuth();

  return (
    <>
      <SearchProducts products={products} setProducts={setProducts} />
      <div className="container">
        <div className="all-products-page">
          {products.map((product, idx) => {
            return <SingleProductCard key={idx} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
