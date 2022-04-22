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
    <fieldset>
      <label>Give Admin to:</label>
      <select
        name="users"
        id="select-users"
        value={userId}
        onChange={(event) => {
          setUserId(event.target.value);
        }}
      >
        <option value="null"></option>
        {userList.map((user, index) => {
          return (
            <option key={index} value={user.id}>
              {user.username}
            </option>
          );
        })}
      </select>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(userId);
        }}
      >
        <button type=" Submit">Give Admin</button>
      </form>
    </fieldset>
  );
};

export default AddAdmin;
