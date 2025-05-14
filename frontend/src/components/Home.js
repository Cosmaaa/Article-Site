import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategorySideBar from "./CategorySideBar";
import { FaPen } from "react-icons/fa";
import axios from "axios";

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

  return (
    <div className="flex bg-green-100 min-h-screen pt-4">
      <CategorySideBar />
      <div className="flex-grow relative px-6">
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
          <p className="text-gray-600 text-xl mt-20 text-center">
            Nu există articole în această categorie.
          </p>
        ) : (
          <div className="flex flex-col items-center gap-6 mt-8">
            {filtered.map((a) => (
              <ArticleCard key={a._id} article={a} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
