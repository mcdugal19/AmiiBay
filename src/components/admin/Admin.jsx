import React from "react";
import {
  AdminTable,
  AddProduct,
  ProductTable,
} from "./index";
const Admin = () => {
  return (
    <>
    <div className="tables">
      <AddProduct />
      <ProductTable />
      <AdminTable />
    </div>
    </>
  );
};

export default Admin;
