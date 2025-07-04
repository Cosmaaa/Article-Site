import React, { useState } from "react";
import axios from "axios";

export default function PublishForm({ user, token }) {
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, category } = form;
    if (!title || !content || !category) {
      setError("Toate câmpurile sunt obligatorii");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/articles",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Articol publicat cu succes!");
      setForm({ title: "", content: "", category: "" });
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Eroare la publicare");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Publică un articol</h2>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titlu articol"
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Conținutul articolului"
          className="w-full p-3 h-32 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Alege categorie</option>
          <option value="sport">Sport</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="tehnologie">Tehnologie</option>
          <option value="ultimaora">Ultima Oră</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg transition"
        >
          Publică
        </button>
      </form>
    </div>
  );
}
