import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export default function CommentsSection({
  articleId,
  showInput,
  onPostComplete,
  showOnlyComments,
  onToggleComments,
  user,
}) {
  const [comments, setComments] = useState([]);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const BASE = "http://localhost:5000/api/articles";

  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE}/${articleId}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    }
  }, [articleId]);

  useEffect(() => { fetchComments(); }, [fetchComments]);
  useEffect(() => { if (showOnlyComments) fetchComments(); }, [showOnlyComments, fetchComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.comment.value.trim();
    if (!text) return;
    try {
      await axios.post(`${BASE}/${articleId}/comments`, {
        author: user.username,
        authorId: user._id,
        text,
      });
      e.target.reset();
      await fetchComments();
      onPostComplete?.();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Eroare la trimiterea comentariului.");
    }
  };

  const confirmDelete = (id) => {
    setPendingDeleteId(id);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
  };

  const doDelete = async (id) => {
    try {
      await axios.delete(`${BASE}/${articleId}/comments/${id}`);
      setPendingDeleteId(null);
      await fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Eroare la ștergerea comentariului.");
    }
  };

  return (
    <div className="mt-4 w-full">
      <div
        className="mb-2 font-medium cursor-pointer text-blue-800 hover:underline"
        onClick={onToggleComments}
      >
        {showOnlyComments
          ? "Ascunde comentarii"
          : `${comments.length} ${
              comments.length === 1 ? "comentariu" : "comentarii"
            }`}
      </div>

      {showOnlyComments && (
        <ul className="max-h-40 overflow-y-auto mb-2 space-y-2">
          {comments.map((c) => (
            <li key={c._id} className="border-b pb-2 relative">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{c.author}</span>

                {c.authorId === user._id && (
                  pendingDeleteId === c._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => doDelete(c._id)}
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Da
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="px-2 py-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        Nu
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => confirmDelete(c._id)}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Șterge comentariul"
                    >
                      <FaTrash size={14} />
                    </button>
                  )
                )}
              </div>

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
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 rounded"
          >
            Postează
          </button>
        </form>
      )}
    </div>
  );
}
