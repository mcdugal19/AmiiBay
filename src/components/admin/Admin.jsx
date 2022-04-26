import React, { useState } from "react";
import {
  AdminTable,
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  ProductTable,
} from "./index";
const Admin = () => {
  const [productId, setProductId] = useState(0);
  return (
    <>
    <div className="tables">
      <AddProduct />
      <ProductTable setProductId={setProductId} />
      {/* <DeleteProduct /> */}
      <UpdateProduct productId={productId} setProductId={setProductId} />
      <AdminTable />
    </div>
    </>
  );
};

export default Admin;
