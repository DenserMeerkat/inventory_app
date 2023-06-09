import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToggleColorMode from "./ToggleColorMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>
);
