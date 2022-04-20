import { useContext } from "react";
import AuthContext from "../AuthContext";

// const context = useContext(AuthContext)

const useAuth = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

  return {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };
};

export default useAuth;