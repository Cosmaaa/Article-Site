import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategorySideBar from "./CategorySideBar";
import pen from "../assets/pen.svg";
import axios from "axios";
import bgPattern from "../assets/background.jpg";
import newsPaper from "../assets/newspaper.jpg";
import { ThemeContext } from "../context/ThemeContext";

export default function MyArticles({ user }) {
  const [myArticles, setMyArticles] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchMine = () => {
    if (!user || !token) return;
    axios
      .get("http://localhost:5000/api/articles/mine", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMyArticles(res.data))
      .catch(console.error);
  };

  useEffect(fetchMine, [user,token]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(fetchMine)
      .catch((err) => alert(err.response?.data?.message || "Delete failed"));
  };

  const isLoggedIn = Boolean(user);

  return (
    <>
      <div className="relative w-full h-40">
        <img
          src={newsPaper}
          alt="Articolele mele"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: darkMode ? 0.6 : 0.4 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-semibold uppercase drop-shadow-lg">
            My Articles
          </h1>
        </div>
        {isLoggedIn && (
          <button
            onClick={() => navigate("/publish")}
            className="absolute top-6 right-8 text-white p-4 rounded-full shadow-xl transition-colors duration-300"
            style={{ backgroundColor: darkMode ? "#374151" : "#3B82F6" }}
            title="Scrie un articol nou"
          >
            <img src={pen} alt="Publish" className="w-[60px] h-[60px]" />
          </button>
        )}
      </div>

      <div
        className="relative flex min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPattern})` }}
      >
        {darkMode && (
          <div
            className="absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none"
            style={{ opacity: 0.7 }}
          />
        )}
        <CategorySideBar />
        <div className="flex-grow relative px-6 pt-8 z-10">
          {myArticles.length === 0 ? (
            <p className="text-gray-200 dark:text-gray-300 text-xl mt-20 text-center">
              Nu ai articole publicate.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {myArticles.map((a) => (
                <ArticleCard
                  key={a._id}
                  article={a}
                  user={user}
                  showDeleteButton={true}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}