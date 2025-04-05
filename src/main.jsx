import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // ✅ Named Import
import { UtilsContextProvider } from "./context/UtilsContext";
import App from "./App";

// ✅ Ensure only ONE Router is used at the top level
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <UtilsContextProvider>
          <App />
        </UtilsContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
