import React, { useState } from "react";
import {
  AdminTable,
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  ProductTable,
} from "./index";
const Admin = () => {
  return (
    <div>
      <AddProduct />
      <ProductTable />
      {/* <DeleteProduct /> */}
      {/* <UpdateProduct productId={productId} setProductId={setProductId} /> */}
      <AdminTable />
    </div>
  );
};

export default Admin;
