import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import { getMe, fetchAllProducts } from "../axios-services";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await getMe();
        if (response) {
          setUser(response);
          setIsLoggedIn(true);
        }
      } catch (error) {
        throw error;
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const amiibos = await fetchAllProducts();
        setProducts(amiibos);
      } catch (error) {
        throw error;
      }
    }
    getProducts();
  }, [setProducts]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        products,
        setProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
