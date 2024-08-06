import "./styles/Main.scss";
import AllTransactions from "./pages/AllTransactions/AllTransactions";
import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <Routes>
            <Route path="/transactions" element={<AllTransactions />} />
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;
