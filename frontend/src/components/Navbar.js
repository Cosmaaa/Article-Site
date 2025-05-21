import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCog, FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo.svg"; 
import userIcon from "../assets/user.svg";

const categories = [
  { label: "All Articles", path: "/" },
  { label: "Sport", path: "/sport" },
  { label: "Ultima Oră", path: "/ultimaora" },
  { label: "Tehnologie", path: "/tehnologie" },
];

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center shadow-lg relative">
      
      <Link to="/" className="flex items-center gap-3">
      <img src={logo} alt="Logo" className="h-12 w-12" />
        <span className="text-3xl font-bold">HOTNEWS</span>
      </Link>

      
      <Link
        to="/"
        className="ml-8 px-3 py-1 rounded-md hover:bg-blue-500 transition"
      >
        Home
      </Link>

      
      <div className="ml-4 relative">
        <button
          onClick={() => setOpen(prev => !prev)}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-500 transition"
        >
          Articles <FaChevronDown />
        </button>
        {open && (
          <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-10">
            {categories.map(cat => (
              <li key={cat.path}>
                <Link
                  to={cat.path}
                  className="block px-4 py-2 hover:bg-gray-200 transition"
                  onClick={() => setOpen(false)}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <div className="flex-grow" />

      
      {!user ? (
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="px-3 py-1 rounded-md hover:bg-blue-500 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-3 py-1 rounded-md hover:bg-blue-500 transition"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
            <img
              src={userIcon}
              alt="User icon"
              className="w-10 h-10 filter invert"
            />
          <span className="px-3 py-1 bg-blue-500 rounded-md">{user.name}</span>
          <button
            onClick={onLogout}
            className="px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      )}

      
      <button
        className="ml-6 p-2 hover:bg-blue-500 rounded-full transition"
        title="Settings"
      >
        <FaCog />
      </button>
    </nav>
  );
}
