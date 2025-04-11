import React, { useState } from "react";
import axios from "axios";

const LogInForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      onLoginSuccess(user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Log In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Log In</button>
      </form>
    </div>
  );
};

export default LogInForm;
