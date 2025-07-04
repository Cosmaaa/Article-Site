import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaChevronDown, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
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
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme, setDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    setDarkMode(false);
    localStorage.setItem("theme", "light");
    onLogout();
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold">HOTNEWS</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:underline">Home</Link>

            <div className="relative">
              <button
                onClick={() => setOpenDropdown(prev => !prev)}
                className="flex items-center gap-1 hover:underline"
              >
                Articles <FaChevronDown size={14} />
              </button>
              {openDropdown && (
                <ul className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-lg z-30">
                  {categories.map((cat) => (
                    <li key={cat.path}>
                      <Link
                        to={cat.path}
                        className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        onClick={() => setOpenDropdown(false)}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {user && (
              <Link to="/my-articles" className="hover:underline">
                My Articles
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full"
            title="Toggle Theme"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="hover:underline">Log In</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <img src={userIcon} alt="User" className="w-10 h-10 filter invert" />
              <span className="px-3 py-1 bg-blue-500 dark:bg-gray-700 rounded-md">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="hover:underline"
              >
                Log Out
              </button>
            </div>
          )}

          <button
            className="p-2 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full"
            title="Settings"
          >
            <FaCog />
          </button>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-2 bg-blue-600 dark:bg-gray-800">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-1"
            >
              Articles <FaChevronDown size={14} />
            </button>
            {openDropdown && (
              <ul className="mt-2 w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow z-30">
                {categories.map((cat) => (
                  <li key={cat.path}>
                    <Link
                      to={cat.path}
                      className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => {
                        setOpenDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {user && (
            <Link to="/my-articles" onClick={() => setMenuOpen(false)}>
              My Articles
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Log In</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mt-2">
                <img src={userIcon} alt="User" className="w-10 h-10 filter invert" />
                <span>{user.name}</span>
              </div>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }}>
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
