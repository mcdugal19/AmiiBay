import React, { useState } from "react";
import { loginUser } from "../axios-services";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setUser, setIsLoggedIn, isLoggedIn, setCart } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">
      <h2>Welcome Back</h2>
      {/* The form below is the form that verifies login credentials */}
      <div className="form-container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const response = await loginUser(username, password);
              setUser(response);
              setCart(response.cart);
              setIsLoggedIn(true);
            } catch (error) {
              console.error(
                "There was a problem with your login information.",
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

          <button type="submit">Log in</button>
        </form>
      </div>
      {/* the below section only displays after a successful user login */}
      <div
        className="login-confirmation"
        style={{
          display: isLoggedIn ? "block" : "none",
        }}
      >
        <h3>LOGIN SUCCESS!</h3>
      </div>
    </div>
  );
};

export default Login;
