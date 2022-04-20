import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM, { createRoot } from "react-dom/client";
import { App } from "./components";
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import "./style/index.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Router>
    <App />
  </Router>
);
