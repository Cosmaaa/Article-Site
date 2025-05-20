import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategorySideBar from "./CategorySideBar";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import bgPattern from "../assets/background.jpg";
import newsPaper from "../assets/newspaper.jpg";

export default function Home({ user }) {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => setArticles(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!category || category === "toate") {
      setFiltered(articles);
    } else {
      setFiltered(
        articles.filter((a) => a.category.toLowerCase() === category)
      );
    }
  }, [category, articles]);

  const isLoggedIn = Boolean(user);
  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Articles";

  return (
    <>
      
      <div className="relative w-full h-40">
        <img
          src={newsPaper}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-semibold uppercase tracking-normal drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>

      
      <div
        className="flex min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPattern})` }}
      >
        <CategorySideBar />
        <div className="flex-grow relative px-6 pt-8">
          {isLoggedIn && (
            <button
              onClick={() => navigate("/publish")}
              className="absolute top-0 right-0 mt-2 mr-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg"
              title="Publish Article"
            >
              <FaPen className="w-5 h-5" />
            </button>
          )}

          {filtered.length === 0 ? (
            <p className="text-gray-200 text-xl mt-20 text-center">
              Nu există articole în această categorie.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filtered.map((a) => (
                <ArticleCard key={a._id} article={a} user={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
