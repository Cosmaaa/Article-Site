import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaChevronDown, FaMoon, FaSun } from "react-icons/fa";
import logo from "../assets/logo.svg";
import userIcon from "../assets/user.svg";
import { ThemeContext } from "../context/ThemeContext";

const categories = [
  { label: "All Articles", path: "/" },
  { label: "Sport", path: "/sport" },
  { label: "Ultima Oră", path: "/latest" },
  { label: "Tehnologie", path: "/tech" },
  { label: "Lifestyle", path: "/lifestyle" },
];

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const { darkMode, toggleTheme, setDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    setDarkMode(false);
    localStorage.setItem("theme", "light");
    onLogout();
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white px-8 py-4 flex items-center shadow-lg relative">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-12" />
        <span className="text-3xl font-bold">HOTNEWS</span>
      </Link>

      <Link
        to="/"
        className="ml-8 px-3 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition"
      >
        Home
      </Link>

      <div className="ml-4 relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition"
        >
          Articles <FaChevronDown />
        </button>
        {open && (
          <ul className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg overflow-hidden z-10">
            {categories.map((cat) => (
              <li key={cat.path}>
                <Link
                  to={cat.path}
                  className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  onClick={() => setOpen(false)}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {user && (
        <Link
          to="/my-articles"
          className="ml-4 px-3 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition"
        >
          My Articles
        </Link>
      )}

      <div className="flex-grow" />

      <button
        onClick={toggleTheme}
        className="p-3 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full transition mr-4"
        title="Toggle Theme"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {!user ? (
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="px-3 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={userIcon}
            alt="User icon"
            className="w-12 h-12 filter invert"
          />
          <span className="px-3 py-1 bg-blue-500 dark:bg-gray-700 rounded-md border border-transparent dark:border-gray-600">
            {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      )}

      <button
        className="ml-6 p-2 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full transition"
        title="Settings"
      >
        <FaCog />
      </button>
    </nav>
  );
}