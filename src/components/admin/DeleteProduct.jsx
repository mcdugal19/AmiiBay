// This component is the delete button to be used in the products table on Admin.jsx. It deletes a product and resets the products state with the filtered array.

import React from "react";
import { toast } from "react-toastify";
import { deleteProduct } from "../../AJAXFunctions";
import useAuth from "../../hooks/useAuth";

const DeleteProduct = ({ productId }) => {
  const { products, setProducts } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteProduct(productId);
      // verify success before removing from frontend products array, alert admin of results
      if (
        response.message === "Product successfully deleted from the database."
      ) {
        const filteredProducts = await products.filter((product) => {
          return product.id !== response.product.id;
        });
        setProducts(filteredProducts);
        toast(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      throw error;
    }
  };

  return <button onClick={handleClick}>Delete Product</button>;
};

export default DeleteProduct;
