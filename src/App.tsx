// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";
import Landing from "./pages/Landing/Landing";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllTransactions from "./pages/AllTransactions/AllTransactions";
import Analytics from "./pages/Analytics/Analytics";
import Categories from "./pages/Categories/Categories";
import Settings from "./pages/Settings/Settings";
import "./styles/Main.scss";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<AllTransactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;
