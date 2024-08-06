import React, { useState } from "react";
import "./Landing.scss";

const Landing: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="landing-container">
      <h1 className="landing-header">Expense Tracker</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username or E-mail:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Sign In</button>
      </form>
      <div className="register-link">
        Don't have an account? <a href="/register">Register here</a>
      </div>
    </div>
  );
};

export default Landing;
