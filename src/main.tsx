import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProviderOptions, LyncAuthProvider, MovementNetwork } from "@lyncworld/movement-social-login-sdk";

const authProviderOptions: AuthProviderOptions = {
  network: MovementNetwork.Testnet,
  useMovementWallets: false,
};

createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <LyncAuthProvider options={authProviderOptions}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LyncAuthProvider>
    <Toaster position="top-center" />
  </React.Fragment>
);
