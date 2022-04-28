import React, { useEffect } from "react";
import SearchProducts from "./SearchProducts";
import useAuth from "../../hooks/useAuth";
import Pagination from "./Pagination";


const AllProducts = () => {
  const { products, searchItems, setSearchItems } = useAuth();

  useEffect(() => {
    setSearchItems(products)
  }, []);

  return (
    <>
    <>
      <div className="top-block">
      <div className="banner-text">BANNER TEXT</div>
      </div>
      </>
      <SearchProducts  />
      <div className="container">
          {searchItems.length > 0 ? ( <>
          <Pagination pageLimit={5} productLimit={20}/>
          </>): (<h1>No Amiibos to Display</h1>)}
      </div>
     
    </>
  );
};

export default AllProducts;
