import React from "react";
import { logoutUser } from "../../axios-services";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Logout = () => {
  const { setIsLoggedIn, setUser, setCart } = useAuth();
  let navigate = useNavigate();

  async function clickHandler(e) {
    e.preventDefault();
    const response = await logoutUser();
    if (!response.loggedIn) {
      toast(response.message);
      setIsLoggedIn(false);
      setUser({});
      setCart([]);
      navigate("/");
    }
  }
  return (
    <Link onClick={clickHandler} to={"/"}>
      Logout
    </Link>
    // <form
    //   onSubmit={async (e) => {
    //     e.preventDefault();
    //     await logoutUser();
    //     setIsLoggedIn(false);
    //   }}
    // >
    //   <button type="submit">Logout</button>;
    // </form>
  );
};

export default Logout;
