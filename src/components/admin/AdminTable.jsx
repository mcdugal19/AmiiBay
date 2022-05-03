// This component is the user table on Admin.jsx that displays all users with buttons to delete a user or a button to make a user an admin.

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getAllUsers,
  giveAdminToUserId,
  deleteUser,
} from "../../AJAXFunctions";

const AdminTable = () => {
  const [userList, setUserList] = useState([]);

  async function initializeUsers() {
    let users = await getAllUsers();
    setUserList(users);
  }

  useEffect(() => {
    initializeUsers();
  }, []);

  async function handleSubmit(id) {
    try {
      const userResponse = await giveAdminToUserId(id);
      if (userResponse.message === "Successfully added new admin!") {
        toast(userResponse.message);
        initializeUsers();
      } else {
        toast.error(userResponse.message);
      }
    } catch (error) {
      throw error;
    }
  }

  async function handleDelete(id) {
    try {
      const userResponse = await deleteUser(id);
      if (userResponse.message === "Successfully deleted user!") {
        toast(userResponse.message);
        initializeUsers();
      } else {
        toast.error(userResponse.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr className="table-headers">
            <th>Username</th>
            <th>Email</th>
            <th>is Admin?</th>
            <th>Make Admin</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, idx) => {
            return (
              <tr className="product-table-content" key={idx}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{`${user.isAdmin}`}</td>
                <td>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSubmit(user.id);
                    }}
                  >
                    <button type="submit">Add Admin</button>
                  </form>
                </td>
                <td>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleDelete(user.id);
                    }}
                  >
                    <button type="submit">Delete User</button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
