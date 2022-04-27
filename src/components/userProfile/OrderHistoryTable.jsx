import React from "react";
import useAuth from "../../hooks/useAuth";

const OrderHistoryTable = () => {
  const { user } = useAuth();

  return (
    <div className="product-table">
      <table>
        <thead>
          <tr className="table-headers">
            <th>Product Name</th>
            <th>Variation</th>
            <th>Game</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {user.orders.map((product, idx) => {
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
                <td>{product.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistoryTable;
