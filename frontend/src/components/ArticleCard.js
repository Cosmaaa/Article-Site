import React, { useState } from "react";
import {
  FaInfoCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaHeart,
  FaTimes,
} from "react-icons/fa";
import CommentsSection from "./CommentsSection";

export default function ArticleCard({ article, user }) {
  const [expanded, setExpanded] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const preview =
    article.content.length > 200
      ? article.content.slice(0, 200) + "..."
      : article.content;

  const handlePostComplete = () => {
    setShowCommentInput(false);
    setShowComments(true);
  };

  return (
    <div className="w-full max-w-2xl bg-green-200 rounded-xl p-6 shadow-md relative">
      <div className="flex items-start gap-3 mb-4">
        <FaInfoCircle className="text-2xl mt-1" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Published: {new Date(article.date).toLocaleDateString()} | Author:{" "}
            {article.author}
          </p>
        </div>
        {expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-gray-700 hover:text-black"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <p className="text-gray-800 mb-4">
        {expanded ? article.content : preview}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mb-4 bg-white border border-gray-400 rounded px-4 py-1 hover:bg-gray-100"
      >
        {expanded ? "Show Less" : "Read More"}
      </button>

      <div className="flex gap-4 text-xl text-gray-700 mb-2">
        <FaThumbsUp className="cursor-pointer hover:text-black" />
        <FaThumbsDown className="cursor-pointer hover:text-black" />
        <FaComment
          className="cursor-pointer hover:text-black"
          onClick={() => {
            setShowCommentInput(true);
            setShowComments(false);
          }}
        />
        <FaHeart className="cursor-pointer hover:text-red-500" />
      </div>

      <CommentsSection
        articleId={article._id}
        showInput={showCommentInput}
        onPostComplete={handlePostComplete}
        showOnlyComments={showComments}
        onToggleComments={() => {
          setShowComments(!showComments);
          setShowCommentInput(false);
        }}
        user={user}
      />
    </div>
  );
}
