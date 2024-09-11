import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ShoppingContextProvider from "./contexts/ShoppingContext";
import { StrictMode } from 'react';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ShoppingContextProvider>
        <App />
      </ShoppingContextProvider>
    </BrowserRouter>
  </StrictMode>
);
