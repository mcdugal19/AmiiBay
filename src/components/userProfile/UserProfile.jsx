// This component displays the individual User Profile section to the user.

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { updateUser } from "../../AJAXFunctions";
import { toast } from "react-toastify";
import { OrderHistoryTable } from "./index";
const UserProfile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="user-profile-page">
      <h1>Welcome {user.username}!</h1>
      <h3>Update Account Information</h3>
      <div className="form-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (password === confirmationPassword) {
                const userObj = { id: user.id };
                username.length > 0 ? (userObj.username = username) : null;
                password.length > 0 ? (userObj.username = username) : null;
                email.length > 0 ? (userObj.email = email) : null;
                password.length > 0 ? (userObj.password = password) : null;
                const response = await updateUser(userObj);
                if (response.error) {
                  toast.error(response.message);
                }
                if (response.updatedUser.id) {
                  toast(response.message);
                  setUsername("");
                  setPassword("");
                  setConfirmationPassword("");
                  setEmail("");
                }
              } else {
                toast.error("Passwords do not match!");
              }
            } catch (error) {
              console.error(
                "There was a problem with updating your user information.",
                error
              );
            }
          }}
        >
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            value={confirmationPassword}
            placeholder="Password Confirmation"
            onChange={(e) => {
              setConfirmationPassword(e.target.value);
            }}
          />
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button type="submit">Update Account</button>
        </form>
      </div>
      <h2>Order History</h2>
      <OrderHistoryTable />
    </div>
  );
};

export default UserProfile;
