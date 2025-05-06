import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";
import Home from "./components/Home";
import PublishForm from "./components/PublishForm";
import { Routes, Route, useNavigate } from "react-router-dom";

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
        .then((res) => setUser(res.data.user))
        .catch(() => {
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
        <Route path="/" element={<Home user={user} />} />
        <Route path="/publish" element={<PublishForm />} />
        <Route path="/login" element={<LogInForm onLoginSuccess={setUser} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/:category" element={<Home user={user} />} />
      </Routes>
    </div>
  );
}

export default App;