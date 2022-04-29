import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { DeleteProduct } from "./index";
import { Modal, Button } from "react-bootstrap";
import { UpdateProduct } from "./index";
const ProductTable = () => {
  const { products, setProducts } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(0);
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductVariation, setUpdateProductVariation] = useState("");
  const [updateProductGame, setUpdateProductGame] = useState("");
  const [updateProductImage, setUpdateProductImage] = useState("");
  const [updateProductDescription, setUpdateProductDescription] = useState("");
  const [updateProductPrice, setUpdateProductPrice] = useState(0);
  const [updateProductInventory, setUpdateProductInventory] = useState(0);

  function handleClose() {
    setShowModal(false);
  }

  function handleShow() {
    setShowModal(true);
  }

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
            <th>Inventory</th>
            <th>Update Product</th>
            <th>Delete Product</th>
          </tr>
        </thead>
        <tbody>
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
                <td>{product.inventory}</td>
                <td>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      // handleUpdateProduct(product.id);
                    }}
                  >
                    <button
                      onClick={() => {
                        handleShow();
                        setProductId(product.id);
                        setUpdateProductName(product.name);
                        setUpdateProductDescription(product.description);
                        setUpdateProductGame(product.game);
                        setUpdateProductImage(product.image);
                        setUpdateProductPrice(+product.price.slice(1));
                        setUpdateProductVariation(product.variation);
                        setUpdateProductInventory(+product.inventory);
                      }}
                    >
                      Update Product
                    </button>
                  </form>
                </td>
                <td>
                  <DeleteProduct productId={product.id} />
                </td>
              </tr>
            );
          })}
          <Modal show={showModal} onHide={handleClose} className="modal">
            <Modal.Header>
              <Modal.Title className="modal-title">Update Product</Modal.Title>
            </Modal.Header>

            <UpdateProduct
              productId={productId}
              setProductId={setProductId}
              updateProductName={updateProductName}
              setUpdateProductName={setUpdateProductName}
              updateProductDescription={updateProductDescription}
              setUpdateProductDescription={setUpdateProductDescription}
              updateProductGame={updateProductGame}
              setUpdateProductGame={setUpdateProductGame}
              updateProductImage={updateProductImage}
              setUpdateProductImage={setUpdateProductImage}
              updateProductPrice={updateProductPrice}
              setUpdateProductPrice={setUpdateProductPrice}
              updateProductVariation={updateProductVariation}
              setUpdateProductVariation={setUpdateProductVariation}
              updateProductInventory={updateProductInventory}
              setUpdateProductInventory={setUpdateProductInventory}
              setShowModal={setShowModal}
            />
            <Button
              className="modal-close-button"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Modal>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
