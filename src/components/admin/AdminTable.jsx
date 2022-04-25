import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  giveAdminToUserId,
  deleteUser,
} from "../../axios-services";

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
    await giveAdminToUserId(id);
    initializeUsers();
  }

  async function handleDelete(id) {
    await deleteUser(id);
    initializeUsers();
  }

  return (
    <div className="user-table">
      <table>
        <tr className="table-headers">
          <th>Username</th>
          <th>Email</th>
          <th>is Admin?</th>
          <th>Make Admin</th>
          <th>Delete User</th>
        </tr>
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
      </table>
    </div>
  );
};

export default AdminTable;
