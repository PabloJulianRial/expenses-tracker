import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Landing.scss";

const Landing: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await login(email, password);
      console.log("User logged in:", userCredential.user); // Log user info after login
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to log in");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-header">Expense Tracker</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign In</button>
      </form>
      <div className="register-link">
        Don't have an account? <a href="/register">Register here</a>
      </div>
    </div>
  );
};

export default Landing;
