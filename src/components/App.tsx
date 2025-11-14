// This component controls the display of all sub-components and contains the routing.

import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/App.css";
import useAuth from "../hooks/useAuth";
import { AllProducts, SingleProduct } from "./products";
import { Cart, SuccessPage } from "./cart";
import { Admin } from "./admin";
import { Login, Register } from "./";
import { NavBar } from "./navbar";
import catMario from "./images/Cat Mario Icon.png";
import { UserProfile } from "./userProfile";

const App: React.FC = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className="app-container">
      <ToastContainer />
      <header>
        <h1 className="Title">AmiiBay</h1>
        {isLoggedIn ? (
          <div className="is-logged-in">
            <Link to={"/me"}>{user.username}</Link>
            <img className="user-icon" src={catMario} alt="user icon" />
          </div>
        ) : null}
      </header>

      <NavBar />

      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:productId" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/me" element={<UserProfile />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
      <footer>
        <h2>⚠️ DEMO SITE - This is for Learning Purposes Only!</h2>
        <p>
          This is a portfolio demonstration project. <strong>No real transactions are processed.</strong>
          <br />
          This site uses Stripe TEST mode - real credit cards will not work and no charges will ever be made.
          <br />
          Test card for demo: 4242 4242 4242 4242 | Any future date | Any CVC
        </p>
      </footer>
    </div>
  );
};

export default App;
