import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      {/* Stânga - Home */}
      <div className="flex-1">
        <Link to="/" className="hover:underline font-semibold">Home</Link>
      </div>

      {/* Mijloc - Articles */}
      <div className="flex-1 text-center">
        <Link to="/articles" className="hover:underline font-semibold">Articles</Link>
      </div>

      {/* Dreapta - Auth */}
      <div className="flex-1 text-right space-x-4">
        {!user && (
          <>
            <Link to="/login" className="hover:underline">Log In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
        {user && (
          <>
            <span className="mr-2">{user.name}</span>
            <button onClick={onLogout} className="hover:underline text-red-400">Log Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
