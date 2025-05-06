import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      navigate("/login"); // navigăm către login
    } catch (error) {
      console.error("Signup error:", error);
      setError("Înregistrare eșuată. Încearcă din nou.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" required onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
