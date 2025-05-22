import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

export default function AuthMode({
  show,
  onClose,
  onLoginSuccess,
  initialView = "login",
}) {
  const [view, setView] = useState(initialView);

 
  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 z-10 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
          title="Close"
        >
          <FaTimes />
        </button>

        {view === "login" ? (
          <>
            <h2 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Welcome to my site! 
            </h2>
            <LogInForm onLoginSuccess={onLoginSuccess} />
            <div className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
              You don't have an account?{" "}
              <button
                onClick={() => setView("signup")}
                className="text-blue-500 font-semibold hover:text-blue-600 transition"
              >
                Sign Up
              </button>
            </div>
            <div className="mt-2 text-sm text-center">
              <button
                onClick={onClose}
                className="text-blue-500 font-semibold hover:text-blue-600 transition"
              >
                Continue as guest
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Join us! 
            </h2>
            <SignUpForm onSignUpSuccess={() => setView("login")} />
            <div className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <button
                onClick={() => setView("login")}
                className="text-blue-500 font-semibold hover:text-blue-600 transition"
              >
                Log In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
