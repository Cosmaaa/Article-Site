import React from "react";

const Navbar = ({ user, onLogout, onShowLogin, onShowSignup }) => {
  return (
    <nav className="bg-gray-800 text-white w-full p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex space-x-4">
          <button
            className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            onClick={() => window.location.href = '/'}
          >
            Home
          </button>
          <button
            className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            onClick={() => window.location.href = '/articles'}
          >
            Articles
          </button>
        </div>

        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              
              <span className="font-semibold">{user.name}</span>
              <button
                className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
                onClick={onLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
                onClick={onShowLogin}
              >
                Log In
              </button>
              <button
                className="hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
                onClick={onShowSignup}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
