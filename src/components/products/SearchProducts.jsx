// This component displays a search bar above the products section and filters the products based on keywords

import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const SearchProducts = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [clickedClear, setClickedClear] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [game, setGame] = useState("all");
  const { products, setSearchItems } = useAuth();

  useEffect(() => {
    async function getGames() {
      const gamesArray = await products.map((product) => {
        return product.game;
      });
      const games = [...new Set(gamesArray)];
      setGameList(games);
    }
    getGames();
  }, [products]);

  function productMatches(product, searchTerm) {
    if (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }
  }

  function gameMatches(product, game) {
    if (game === "all") {
      return true;
    }
    if (product.game.includes(game)) {
      return true;
    }
  }
  // The useEffects below display the filtered results and allows a clear button to return the state to all routines
  
  useEffect(() => {
    const filteredProductsArray = products.filter((product) =>
      productMatches(product, searchTerm)
    );
    setSearchItems(filteredProductsArray);
    setCurrentPage(1);
  }, [clickedSearch]);

  useEffect(() => {
    const filteredProductsArray = products.filter((product) =>
      gameMatches(product, game)
    );
    setSearchItems(filteredProductsArray);
  }, [game]);

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
      <label htmlFor="select-game">Game</label>
      <span className="game-count">({gameList.length})</span>
      <select
        name="game"
        id="select-game"
        value={game}
        onChange={(event) => {
          // if(game !== "any"){
          setGame(event.target.value);
        }}
      >
        <option value="all">Any</option>
        {/* map over the gameList, return an <option /> */}
        {gameList.map((game, index) => {
          return (
            <option key={index} value={game}>
              {game}
            </option>
          );
        })}
      </select>
      <button className="button" type="submit">
        SEARCH
      </button>
      <button
        className="button"
        onClick={async () => {
          await setSearchItems(products);
          setClickedClear(!clickedClear);
          setSearchTerm("");
          setGame("all");
        }}
      >
        CLEAR
      </button>
    </form>
  );
};

export default SearchProducts;
