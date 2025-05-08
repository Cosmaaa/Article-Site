import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function CommentsSection({
  articleId,
  showInput,
  onPostComplete,
  showOnlyComments,
  onToggleComments,
}) {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/articles/${articleId}/comments`
      );
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    if (showOnlyComments) {
      fetchComments();
    }
  }, [showOnlyComments, fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = e.target.elements[0].value.trim();
    if (!trimmed) return;

    try {
      await axios.post(
        `http://localhost:5000/api/articles/${articleId}/comments`,
        { author: "Current User", text: trimmed }
      );
      await fetchComments();
      e.target.reset();
      onPostComplete?.();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Eroare la trimiterea comentariului. Vezi consola serverului.");
    }
  };

  return (
    <div className="mt-4 w-full">
      <div
        className="mb-2 font-medium cursor-pointer text-blue-800 hover:underline"
        onClick={() => onToggleComments?.()}
      >
        {showOnlyComments ? "Ascunde comentarii" : `${comments.length} ${comments.length === 1 ? "comentariu" : "comentarii"}`}
      </div>

      {showOnlyComments && (
        <ul className="max-h-40 overflow-y-auto mb-2 space-y-2">
          {comments.map((c) => (
            <li key={c._id || c.date} className="border-b pb-2">
              <div className="font-semibold">{c.author}</div>
              <div className="text-gray-800">{c.text}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(c.date).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showInput && (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <input
            name="comment"
            placeholder="Scrie un comentariu..."
            className="flex-grow border rounded px-2 py-1"
          />
          <button type="submit" className="bg-blue-500 text-white px-3 rounded">
            Postează
          </button>
        </form>
      )}
    </div>
  );
}
