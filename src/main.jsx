import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import BillState from "./context/bill/billState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BillState>
    <App />
  </BillState>
);
