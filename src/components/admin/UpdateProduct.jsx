import React from "react";
import { updateProduct } from "../../AJAXFunctions";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const UpdateProduct = ({
  productId,
  setProductId,
  updateProductName,
  setUpdateProductName,
  updateProductVariation,
  setUpdateProductVariation,
  updateProductGame,
  setUpdateProductGame,
  updateProductImage,
  setUpdateProductImage,
  updateProductPrice,
  setUpdateProductPrice,
  updateProductDescription,
  setUpdateProductDescription,
  updateProductInventory,
  setUpdateProductInventory,
  setShowModal,
}) => {
  const { products, setProducts } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //build update object
    const updateObj = {};
    updateObj.name = updateProductName;
    updateObj.variation = updateProductVariation;
    updateObj.game = updateProductGame;
    updateObj.image = updateProductImage;
    updateObj.description = updateProductDescription;
    updateObj.price = +updateProductPrice;
    updateObj.inventory = +updateProductInventory;
    try {
      const response = await updateProduct(productId, updateObj);
      if (response.message === "Successfully updated product!") {
        toast(response.message);
        const filteredProducts = await products.filter((product) => {
          return product.id !== response.product.id;
        });
        const updatedList = [response.product, ...filteredProducts];
        setProducts(updatedList);
        setShowModal(false);
      } else {
        toast.error(response.message);
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
          value={updateProductName}
          onChange={(e) => {
            setUpdateProductName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Variation"
          value={updateProductVariation}
          onChange={(e) => {
            setUpdateProductVariation(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Game"
          value={updateProductGame}
          onChange={(e) => {
            setUpdateProductGame(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={updateProductImage}
          onChange={(e) => {
            setUpdateProductImage(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={updateProductDescription}
          onChange={(e) => {
            setUpdateProductDescription(e.target.value);
          }}
        />
        <input
          type="number"
          min="0.01"
          step="any"
          placeholder={updateProductPrice}
          value={updateProductPrice}
          onChange={(e) => {
            setUpdateProductPrice(e.target.value);
          }}
        />
        <input
          type="number"
          min="0"
          step="1"
          placeholder={updateProductInventory}
          value={updateProductInventory}
          onChange={(e) => {
            setUpdateProductInventory(e.target.value);
          }}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
