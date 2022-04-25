import React, { useState } from "react";
import { updateProduct } from "../../axios-services";
import useAuth from "../../hooks/useAuth";

const UpdateProduct = ({ productId, setProductId }) => {
  const { products, setProducts } = useAuth();
  const [name, setName] = useState("");
  const [variation, setVariation] = useState("");
  const [game, setGame] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //build update object
    const updateObj = {};
    name.length > 0 ? (updateObj.name = name) : null;
    variation.length > 0 ? (updateObj.variation = variation) : null;
    game.length > 0 ? (updateObj.game = game) : null;
    image.length > 0 ? (updateObj.image = image) : null;
    description.length > 0 ? (updateObj.description = description) : null;
    price > 0 ? (updateObj.price = price) : null;

    try {
      const response = await updateProduct(productId, updateObj);
      if (response.message === "Successfully updated product!") {
        setMessage(response.message);
        const filteredProducts = await products.filter((product) => {
          return product.id !== response.product.id;
        });
        const updatedList = [response.product, ...filteredProducts];
        setProducts(updatedList);
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="update-product">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Id"
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
          }}
        />
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
        <button type="submit">Update Product</button>
      </form>
      {message.length > 0 ? <small>{message}</small> : null}
    </div>
  );
};

export default UpdateProduct;
