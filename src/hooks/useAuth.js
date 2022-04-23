import { useContext } from "react";
import AuthContext from "../AuthContext";

// const context = useContext(AuthContext)

const useAuth = () => {
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    products,
    setProducts,
    cart,
    setCart,
  } = useContext(AuthContext);

  return {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    products,
    setProducts,
    cart,
    setCart,
  };
};

export default useAuth;
