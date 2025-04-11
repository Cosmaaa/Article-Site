import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import LogInForm from "./components/LogInForm";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

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
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onShowLogin={handleShowLogin}
        onShowSignup={handleShowSignup}
      />

      <div className="p-4">
        <h1 className="text-2xl text-blue-500">
          {user ? `Welcome back, ${user.name}!` : "Welcome to the main page!"}
        </h1>
      </div>

      {showLogin && (
        <LogInForm
          onLoginSuccess={(user) => {
            setUser(user);
            setShowLogin(false);
          }}
        />
      )}

      {showSignup && (
        <SignUpForm
          onSignupSuccess={(user) => {
            setUser(user);
            setShowSignup(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
