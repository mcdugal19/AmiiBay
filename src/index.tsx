import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { App } from "./components";
import "./style/index.css";
import AuthProvider from "./components/AuthProvider";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
root.render(
  <Router>
    <AuthProvider>
       <App />
    </AuthProvider>
  </Router>
);
