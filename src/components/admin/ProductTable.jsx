import React from "react";
import useAuth from "../../hooks/useAuth";
import { DeleteProduct } from "./index";
const ProductTable = ({ setProductId }) => {
  const { products, setProducts } = useAuth();

  function handleUpdateProduct(id) {
    setProductId(id);
  }

  return (
    <div className="product-table">
      <table>
        <tr className="table-headers">
          <th>Product Name</th>
          <th>Variation</th>
          <th>Game</th>
          <th>Image</th>
          <th>Description</th>
          <th>Price</th>
          <th>Update Product</th>
          <th>Delete Product</th>
        </tr>
        {products.map((product, idx) => {
          return (
            <tr className="product-table-content" key={idx}>
              <td>{product.name}</td>
              <td>{product.variation}</td>
              <td>{product.game}</td>
              <td>
                <img
                  src={product.image}
                  width={"130px"}
                  height={"130px"}
                  alt={`${product.name} amiibo image`}
                />
              </td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleUpdateProduct(product.id);
                  }}
                >
                  <button type="submit">Update Product</button>
                </form>
              </td>
              <td>
                <DeleteProduct productId={product.id} />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ProductTable;
