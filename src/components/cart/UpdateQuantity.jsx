import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const UpdateQuantity = () => {
  const [clicked, setClicked] = useState(false);
  const [updateQuantity, setUpdateQuantity] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setClicked(!clicked);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {clicked ? (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            step="1"
            value={updateQuantity}
            onChange={(e) => {
              setUpdateQuantity(e.target.value);
            }}
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <button
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          Update Quantity?
        </button>
      )}
    </>
  );
};

export default UpdateQuantity;
