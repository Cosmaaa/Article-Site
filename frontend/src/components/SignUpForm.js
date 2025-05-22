import { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm({ onSignUpSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setError("");
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      if (res.status === 201) {
        onSignUpSuccess();
        return;
      }
      setError("A apărut ceva neașteptat. Încearcă din nou.");
    } catch (err) {
      const msg =
        err.response?.data?.message === "Email already in use"
          ? "Email-ul este deja folosit."
          : "Înregistrare eșuată. Încearcă din nou.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
      />

      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          value={formData.password}
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
        Sign Up
      </button>
    </form>
  );
}
