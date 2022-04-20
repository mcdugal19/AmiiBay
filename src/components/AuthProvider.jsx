import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { getMe } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getUser() {
      const response = await getMe();
      if (response) {
        setUser(response);
        setIsLoggedIn(true);
      }
    }
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
