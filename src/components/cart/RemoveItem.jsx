import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const RemoveItem = () => {
  const [clicked, setClicked] = useState(false);

  async function handleClick() {
    try {
      setClicked(!clicked);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button onClick={handleClick}>Remove</button>
      {clicked ? <small>I was clicked!</small> : null}
    </>
  );
};

export default RemoveItem;
