import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
    <Toaster position="top-center" />
  </React.Fragment>
);
