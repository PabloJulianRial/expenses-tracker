// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import AllTransactions from "./pages/AllTransactions/AllTransactions";
import "./styles/Main.scss";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transactions" element={<AllTransactions />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;
