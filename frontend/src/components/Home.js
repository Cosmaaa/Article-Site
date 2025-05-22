import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategorySideBar from "./CategorySideBar";
import pen from "../assets/pen.svg";
import axios from "axios";
import bgPattern from "../assets/background.jpg";
import newsPaper from "../assets/newspaper.jpg";
import { ThemeContext } from "../context/ThemeContext";

export default function Home({ user }) {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

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
        
        <div className="absolute inset-0 bg-black transition-opacity duration-300"
             style={{ opacity: darkMode ? 0.6 : 0.4 }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-semibold uppercase tracking-normal drop-shadow-lg">
            {title}
          </h1>
        </div>

        
        {isLoggedIn && (
          <button
            onClick={() => navigate("/publish")}
            className="absolute top-6 right-8 text-white p-4 rounded-full shadow-xl transition-colors duration-300"
            style={{ backgroundColor: darkMode ? '#374151' : '#3B82F6' }}
            title="Publish Article"
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
          {filtered.length === 0 ? (
            <p className="text-gray-200 dark:text-gray-300 text-xl mt-20 text-center">
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
