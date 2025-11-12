// Type definitions for AmiiBay application

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  isadmin: boolean;
  cart: CartItem[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageurl: string;
  instock: boolean;
  category: string;
}

export interface CartItem {
  id: number;
  userid: number;
  productid: number;
  quantity: number;
  product?: Product;
  name?: string;
  price?: string;
  imageurl?: string;
}

export interface Order {
  id: number;
  userid: number;
  totalprice: string;
  status: string;
  createdat: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderid: number;
  productid: number;
  quantity: number;
  price: string;
  product?: Product;
}

export interface Review {
  id: number;
  userid: number;
  productid: number;
  rating: number;
  comment: string;
  createdat: string;
  username?: string;
}

export interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  searchItems: Product[];
  setSearchItems: (items: Product[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

export interface StripeLineItem {
  name: string;
  price: string;
  quantity: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
