import React, { useState } from "react";
import { addNewProduct } from "../../axios-services";
import useAuth from "../../hooks/useAuth";
const AddProduct = () => {
  const { products, setProducts } = useAuth();
  const [name, setName] = useState("");
  const [variation, setVariation] = useState("");
  const [game, setGame] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(19.99);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addNewProduct({
        name,
        variation,
        game,
        image,
        description,
        price,
      });
      console.log(response, "response");
      if (response.message === "Successfully added product!") {
        setMessage(response.message);
        const updatedList = [response.product, ...products];
        setProducts(updatedList);
        setName("");
        setVariation("");
        setGame("");
        setImage("");
        setDescription("");
        setPrice("");
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Variation"
          value={variation}
          onChange={(e) => {
            setVariation(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Game"
          value={game}
          onChange={(e) => {
            setGame(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="number"
          min="0.01"
          step="any"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <button type="submit">Add Product</button>
      </form>
      {message.length > 0 ? <small>{message}</small> : null}
    </div>
  );
};

export default AddProduct;
