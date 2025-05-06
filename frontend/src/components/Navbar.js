import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaCog } from "react-icons/fa";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-green-600 text-black px-6 py-3 flex items-center relative">
      {/* Stânga: carte + Home */}
      <div className="flex items-center gap-3">
        <FaBook className="text-xl" />
        <Link to="/" className="font-semibold hover:underline">Home</Link>
      </div>

      {/* Centru: Articles */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/articles" className="font-semibold hover:underline">Articles</Link>
      </div>

      {/* Dreapta: Auth + Settings */}
      <div className="ml-auto flex items-center gap-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Log In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
        {user && (
          <>
            <span className="mr-2"> {user.name}</span>
            <button onClick={onLogout} className="hover:underline text-red-700">Log Out</button>
          </>
        )}
        <button className="p-1 hover:bg-green-500 rounded" title="Settings">
          <FaCog />
        </button>
      </div>
    </nav>
  );
}
