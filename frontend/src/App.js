import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PublishForm from "./components/PublishForm";
import Footer from "./components/Footer";
import AuthMode from "./components/AuthMode";
import MyArticles from "./components/MyArticles";

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authView, setAuthView] = useState("login"); 
  const navigate = useNavigate();
  const location = useLocation();

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
          setShowAuth(true);
          setAuthView("login");
        });
    } else {
      const hasVisited = localStorage.getItem("hasVisited");
      if (!hasVisited) {
        setShowAuth(true);
        setAuthView("login");
        localStorage.setItem("hasVisited", "true");
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setAuthView(location.pathname.slice(1));
      setShowAuth(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowAuth(true);
    setAuthView("login");
    navigate("/");
  };

  const handleLoginSuccess = (user) => {
    setUser(user);
    setShowAuth(false);
    navigate("/");
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
    if (location.pathname === "/login" || location.pathname === "/signup") {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />

      <AuthMode
        show={showAuth}
        initialView={authView}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/publish" element={<PublishForm />} />
          <Route path="/:category" element={<Home user={user} />} />
          <Route path="/login" element={<Home user={user} />} />
          <Route path="/signup" element={<Home user={user} />} />
          <Route path="/my-articles" element={<MyArticles user={user} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
