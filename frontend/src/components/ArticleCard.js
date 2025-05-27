import { useState, useEffect, useMemo } from "react";
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
import ConfirmWindow from "./ConfirmWindow";
import placeholderImg from "../assets/placeholder.jpg";

export default function ArticleCard({
  article,
  user,
  showDeleteButton = false,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const likesArr = useMemo(
    () => (Array.isArray(article.likes) ? article.likes : []),
    [article.likes]
  );
  const dislikesArr = useMemo(
    () => (Array.isArray(article.dislikes) ? article.dislikes : []),
    [article.dislikes]
  );
  const heartsArr = useMemo(
    () => (Array.isArray(article.hearts) ? article.hearts : []),
    [article.hearts]
  );

  const [counts, setCounts] = useState({
    likes: likesArr.length,
    dislikes: dislikesArr.length,
    hearts: heartsArr.length,
  });
  const [mine, setMine] = useState({ liked: false, disliked: false, hearted: false });

  useEffect(() => {
    setCounts({
      likes: likesArr.length,
      dislikes: dislikesArr.length,
      hearts: heartsArr.length,
    });
    setMine({
      liked: Boolean(user && likesArr.includes(user._id)),
      disliked: Boolean(user && dislikesArr.includes(user._id)),
      hearted: Boolean(user && heartsArr.includes(user._id)),
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
        likes: res.data.likes,
        dislikes: res.data.dislikes,
        hearts: res.data.hearts,
      });
      setMine(res.data.myReactions);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Eroare la reacție.");
    }
  };

  const preview =
    article.content.length > 150 ? article.content.slice(0, 150) + "..." : article.content;

  const onDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    onDelete(article._id);
  };

  const cancelDelete = () => setConfirmOpen(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="relative group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow transition-transform hover:scale-[1.02] hover:shadow-lg"
    >
      {showDeleteButton && (
        <button
          onClick={onDeleteClick}
          className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 z-10"
          title="Șterge articol"
        >
          <FaTimes />
        </button>
      )}

      <ConfirmWindow
        open={confirmOpen}
        message="Ești sigur că vrei să ștergi acest articol?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <div className="h-48 w-full overflow-hidden">
        <img
          src={article.imageUrl || placeholderImg}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
          <FaInfoCircle className="mr-1" />
          <span className="uppercase">{article.category || "General"}</span>
          <span className="mx-2">•</span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {article.title}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          By {article.author}
        </p>

        <p className="text-gray-800 dark:text-gray-200 mb-4">
          {expanded ? article.content : preview}
        </p>

        {!expanded && (
          <button
            className="self-start text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline mb-4"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
          >
            Abstract
          </button>
        )}

        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300 mb-4">
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleReact("like");
            }}
            className={`flex items-center gap-1 ${mine.liked ? "text-blue-600" : ""}`}
          >
            <FaThumbsUp /> <span className="text-sm">{counts.likes}</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleReact("dislike");
            }}
            className={`flex items-center gap-1 ${mine.disliked ? "text-blue-600" : ""}`}
          >
            <FaThumbsDown /> <span className="text-sm">{counts.dislikes}</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleReact("heart");
            }}
            className={`flex items-center gap-1 ${mine.hearted ? "text-red-600" : ""}`}
          >
            <FaHeart /> <span className="text-sm">{counts.hearts}</span>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowCommentInput(true);
              setShowComments(false);
            }}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FaComment />
          </div>
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
    </div>
  );
}
