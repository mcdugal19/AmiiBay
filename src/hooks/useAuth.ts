// The Use Auth hook is the main connector throughout our source components to declare our state dependant variables that need to persist within multiple components. This hook allowed us to avoid excessive prop threading throughout our components.

import { useContext } from "react";
import AuthContext from "../AuthContext";
import { AuthContextType } from "../types";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const {
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
  } = context;

  return {
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
  };
};

export default useAuth;
