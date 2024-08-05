import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/Main.scss";
import { TransactionProvider } from "./context/TransactionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </React.StrictMode>
);
