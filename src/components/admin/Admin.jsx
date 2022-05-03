// This component is the main admin page component that displays the add product form, product table with edit and delete functionality, and user table with delete and make admin functionality.

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
      <br></br>
      <br></br>
      <AdminTable />
    </div>
    </>
  );
};

export default Admin;
