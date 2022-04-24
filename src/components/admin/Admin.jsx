import React from "react";
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
      {/* <UpdateProduct /> */}
      <AdminTable />
    </div>
  );
};

export default Admin;
