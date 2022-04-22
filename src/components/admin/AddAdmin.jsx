import React, { useState, useEffect, useMemo } from "react";
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
          console.log(user.isAdmin);
          return (
            <tr key={idx}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{`${user.isAdmin}`}</td>
              <td>{"placeholder"}</td>
              <td>{"placeholder"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default AddAdmin;
