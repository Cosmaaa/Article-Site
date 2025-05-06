import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import Home from "./components/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error("Autentificare expirată sau invalidă:", err);
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/toate" />} />
        <Route path="/login" element={<LogInForm onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/:category" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
