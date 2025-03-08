import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
/*import { AuthProvider } from "./context/AuthProvider";*/
import { UtilsContextProvider } from "./context/UtilsContext";
import AuthProvider from "./context/AuthProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter> {/* ✅ Only one Router at the top */}
      <AuthProvider>
        <UtilsContextProvider>
          <App />
        </UtilsContextProvider>
      </AuthProvider>
    </BrowserRouter>
  
);
