// AuthProvider provides the connection from the main App in the index.js

import { ReactNode, useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import { getMe, fetchAllProducts } from "../AJAXFunctions";
import { User, Product, CartItem, Order } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchItems, setSearchItems] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await getMe();
        if (response.id) {
          setUser(response);
          setIsLoggedIn(true);
          setCart(response.cart || []);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getProducts() {
      try {
        const amiibos = await fetchAllProducts();
        setProducts(amiibos);
        setSearchItems(amiibos);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    getProducts();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        products,
        setProducts,
        cart,
        setCart,
        searchItems,
        setSearchItems,
        orders,
        setOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
