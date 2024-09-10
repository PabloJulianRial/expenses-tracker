// src/pages/Settings/Settings.tsx

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updatePassword } from "firebase/auth";
import Navbar from "../../components/Navbar/Navbar";
import "./Settings.scss";

const Settings: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.body.classList.contains("dark-theme")
  );
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const handlePasswordChange = async () => {
    if (!currentUser) {
      setPasswordError("User not logged in");
      return;
    }

    try {
      await updatePassword(currentUser, newPassword);
      setPasswordSuccess("Password updated successfully");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError("Failed to update password. Please try again.");
    }
  };

  const toggleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
  };

  return (
    <div className="settings-container">
      <Navbar />
      <h2>Settings</h2>

      <div className="settings-section">
        <h3>Change Password</h3>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <button onClick={handlePasswordChange}>Change Password</button>
        {passwordError && <p className="error">{passwordError}</p>}
        {passwordSuccess && <p className="success">{passwordSuccess}</p>}
      </div>

      <div className="settings-section">
        <h3>Dark Theme</h3>
        <label>
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={toggleDarkTheme}
          />
          Activate Dark Theme
        </label>
      </div>

      <div className="settings-section">
        <h3>Logout</h3>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default Settings;
