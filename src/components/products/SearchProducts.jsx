import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../../axios-services/index";

// this component displays a search bar above the products section and filters the products based on keywords

const SearchProducts = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [clickedClear, setClickedClear] = useState(false);

  function productMatches(product, searchTerm) {
    //update according to the API
    if (
      product.name.includes(searchTerm) ||
      product.description.includes(searchTerm)
    ) {
      return true;
    }
  }

  // The useEffects below display the filtered results and allows a clear button to return the state to all routines
  useEffect(() => {
    const filteredProductsArray = products.filter((product) =>
      productMatches(product, searchTerm)
    );
    setProducts(filteredProductsArray);
  }, [clickedSearch]);

  useEffect(() => {
    const getProducts = async () => {
      const productsArray = await fetchAllProducts();
      setProducts(productsArray);
    };
    getProducts();
  }, [clickedClear]);

  return (
    <form
      id="search"
      onSubmit={async (event) => {
        event.preventDefault();
        setClickedSearch(!clickedSearch);
      }}
    >
      <label htmlFor="keywords">Search</label>
      <input
        id="keywords"
        type="text"
        placeholder="enter keyword..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button className="button" type="submit">SEARCH</button>
      <button className="button"
        onClick={() => {
          setClickedClear(!clickedClear);
        }}
      >
        CLEAR
      </button>
    </form>
  );
};

export default SearchProducts;