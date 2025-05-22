import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LogInForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      onLoginSuccess(user);
    } catch (err) {
      console.error(err);
      setError("Email sau parolă incorecte.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          onChange={handleChange}
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-2 text-gray-600 dark:text-gray-300"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
        Log In
      </button>
    </form>
  );
}
