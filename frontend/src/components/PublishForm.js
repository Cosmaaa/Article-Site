import React, { useState } from "react";
import axios from "axios";

export default function PublishForm() {
  const [form, setForm] = useState({ author: "", title: "", content: "", category: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.author || !form.title || !form.content || !form.category) {
      setError("Toate câmpurile sunt obligatorii");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/articles", form, { withCredentials: true });
      setSuccess("Articol publicat cu succes!");
      setForm({ author: "", title: "", content: "", category: "" });
    } catch (e) {
      setError(e.response?.data?.message || "Eroare la publicare");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Publică un articol</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Autor"
          className="border p-2 rounded"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titlu"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Conținut"
          className="border p-2 rounded h-32 resize-none"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Alege categorie</option>
          <option value="sport">Sport</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="tehnologie">Tehnologie</option>
          <option value="ultimaora">Ultima Oră</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Publică
        </button>
      </form>
    </div>
  );
}
