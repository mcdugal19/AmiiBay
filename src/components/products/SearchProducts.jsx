import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchAllProductsByGame,
} from "../../axios-services/index";

// this component displays a search bar above the products section and filters the products based on keywords

const SearchProducts = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [clickedClear, setClickedClear] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [game, setGame] = useState("any");
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

  useEffect(() => {
    const getProductsByGame = async () => {
      const productsArrayByGame = await fetchAllProductsByGame();
      setProducts(productsArrayByGame);
    };
    getProductsByGame();
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
      <fieldset>
        <label htmlFor="select-game">
          Game <span className="game-count">({gameList.length})</span>
        </label>
        <select
          name="game"
          id="select-game"
          value={game}
          onChange={(event) => {
            setGame(event.target.value);
          }}
        >
          <option value="any">Any</option>
          {/* map over the gameList, return an <option /> */}
          {gameList.map((game, index) => {
            return (
              <option key={index} value={game}>
                {game}
              </option>
            );
          })}
        </select>
      </fieldset>
      <button className="button" type="submit">
        SEARCH
      </button>
      <button
        className="button"
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
