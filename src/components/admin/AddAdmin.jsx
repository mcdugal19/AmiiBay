import React, { useState, useEffect } from "react";
import { getAllUsers, giveAdminToUserId } from "../../axios-services";

const AddAdmin = () => {
  const [userId, setUserId] = useState("");
  const [userList, setUserList] = useState([]);

  async function initializeUsers() {
    let users = await getAllUsers();
    console.log(users, "user");
    setUserList(users);
  }

  useEffect(() => {
    initializeUsers();
  }, []);

  async function handleSubmit(id) {
    await giveAdminToUserId(id);
  }

  return (
    <div className="user-table">
      <table>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>is Admin?</th>
          <th>Make Admin</th>
          <th>Delete User</th>
        </tr>
        {userList.map((user, idx) => {
          return (
            <tr key={idx}>
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
              <td>{"placeholder"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AddAdmin;
