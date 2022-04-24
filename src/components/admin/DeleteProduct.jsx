import React from "react";
import { deleteProduct } from "../../axios-services";
import useAuth from "../../hooks/useAuth";
const DeleteProduct = ({ productId }) => {
  const { products, setProducts } = useAuth();
  // click handler
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // prompt admin to ensure intentional click
      let text = "Are you sure you want to delete this product?";

      if (confirm(text)) {
        const response = await deleteProduct(productId);
        console.log(response, "RESPONSE");

        // verify success before removing from frontend products array, alert admin of results
        if (
          response.message === "Product successfully deleted from the database."
        ) {
          const filteredProducts = await products.filter((product) => {
            return product.id !== response.product.id;
          });
          console.log(filteredProducts, "filtered");
          setProducts(filteredProducts);
          alert(response.message);
        } else {
          alert(response.message);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return <button onClick={handleClick}>Delete Product</button>;
};

export default DeleteProduct;
