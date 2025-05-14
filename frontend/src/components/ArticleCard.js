import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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

  
  const likesArr    = useMemo(() => Array.isArray(article.likes)    ? article.likes    : [], [article.likes]);
  const dislikesArr = useMemo(() => Array.isArray(article.dislikes) ? article.dislikes : [], [article.dislikes]);
  const heartsArr   = useMemo(() => Array.isArray(article.hearts)   ? article.hearts   : [], [article.hearts]);

  
  const [counts, setCounts] = useState({
    likes:    likesArr.length,
    dislikes: dislikesArr.length,
    hearts:   heartsArr.length,
  });
  const [mine, setMine] = useState({
    liked:    false,
    disliked: false,
    hearted:  false,
  });

  useEffect(() => {
    setCounts({
      likes:    likesArr.length,
      dislikes: dislikesArr.length,
      hearts:   heartsArr.length,
    });
    setMine({
      liked:    Boolean(user && likesArr.includes(user._id)),
      disliked: Boolean(user && dislikesArr.includes(user._id)),
      hearted:  Boolean(user && heartsArr.includes(user._id)),
    });
  }, [user, likesArr, dislikesArr, heartsArr]);

  const handleReact = async (type) => {
    if (!user) return alert("Trebuie să fii logat pentru a reacționa.");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/articles/${article._id}/react`,
        { type },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setCounts({
        likes:    res.data.likes,
        dislikes: res.data.dislikes,
        hearts:   res.data.hearts,
      });
      setMine(res.data.myReactions);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Eroare la înregistrarea reacției.");
    }
  };

  
  const preview =
    article.content.length > 200
      ? article.content.slice(0, 200) + "..."
      : article.content;

  return (
    <div className="w-full max-w-2xl bg-green-200 rounded-xl p-6 shadow-md relative mb-6">
      
      <div className="flex items-start gap-3 mb-4">
        <FaInfoCircle className="text-2xl mt-1" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Published: {new Date(article.date).toLocaleDateString()} | Author: {article.author}
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

      
      <div className="flex gap-6 text-xl text-gray-700 mb-2">
        <div
          className={`flex items-center cursor-pointer ${mine.liked ? "text-blue-600" : ""}`}
          onClick={() => handleReact("like")}
        >
          <FaThumbsUp className="hover:text-black" />
          <span className="ml-1 text-sm">{counts.likes}</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${mine.disliked ? "text-blue-600" : ""}`}
          onClick={() => handleReact("dislike")}
        >
          <FaThumbsDown className="hover:text-black" />
          <span className="ml-1 text-sm">{counts.dislikes}</span>
        </div>
        <div
          className={`flex items-center cursor-pointer ${mine.hearted ? "text-red-600" : ""}`}
          onClick={() => handleReact("heart")}
        >
          <FaHeart className="hover:text-red-500" />
          <span className="ml-1 text-sm">{counts.hearts}</span>
        </div>
        <FaComment
          className="cursor-pointer hover:text-black"
          onClick={() => {
            setShowCommentInput(true);
            setShowComments(false);
          }}
        />
      </div>

      
      <CommentsSection
        articleId={article._id}
        user={user}
        showInput={showCommentInput}
        onPostComplete={() => {
          setShowCommentInput(false);
          setShowComments(true);
        }}
        showOnlyComments={showComments}
        onToggleComments={() => {
          setShowComments(!showComments);
          setShowCommentInput(false);
        }}
      />
    </div>
  );
}
