import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

// this component displays a search bar above the products section and filters the products based on keywords

const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [clickedClear, setClickedClear] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [game, setGame] = useState("any");
  const {products, searchItems, setSearchItems} = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    async function getGames(){
      const gamesArray = await products.map((product) => {
          return product.game;
        })
        console.log(gamesArray, "gamesArray")
        const games = [...new Set(gamesArray)];
        setGameList(games)
        console.log(games, "games")
    }
    getGames();
  
}, [products]);

  function productMatches(product, searchTerm, game) {
    //update according to the API
    if (
      product.name.includes(searchTerm) ||
      product.description.includes(searchTerm) ||
      product.game.includes(game)
    ) {
      return true;   
    }
  }
 
  // The useEffects below display the filtered results and allows a clear button to return the state to all routines
  useEffect(() => {
    const filteredProductsArray = products.filter((product) =>
      productMatches(product, searchTerm, game)
    );
    setIsLoaded(true);
    setSearchItems(filteredProductsArray);
  }, [clickedSearch]);

  useEffect(() => {
    
  }, [searchItems])

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
          setSearchTerm(e.target.value.toLowerCase());
        }}
      />
        <label htmlFor="select-game">
          Game 
        </label>
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
      <button className="button" type="submit" >
        SEARCH
      </button>
      <button
        className="button"
        onClick={async () => {
        await setSearchItems(products);
          setClickedClear(!clickedClear);
        }}
      >
        CLEAR
      </button>
    </form>
  );
};

export default SearchProducts;
