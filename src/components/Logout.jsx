import React from "react";
import { logoutUser } from "../axios-services";
import useAuth from "../hooks/useAuth";
const Logout = () => {
  const { setIsLoggedIn } = useAuth();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await logoutUser();
        setIsLoggedIn(false);
      }}
    >
      <button type="submit">Logout</button>;
    </form>
  );
};

export default Logout;
