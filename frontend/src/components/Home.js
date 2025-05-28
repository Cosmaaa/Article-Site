import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategorySideBar from "./CategorySideBar";
import Comercial from "./Comercial"; 
import pen from "../assets/pen.svg";
import axios from "axios";
import bgPattern from "../assets/background.jpg";
import newsPaper from "../assets/newspaper.jpg";
import { ThemeContext } from "../context/ThemeContext";

export default function Home({ user }) {
  const [articles, setArticles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showAd1, setShowAd1] = useState(false);
  const [showAd2, setShowAd2] = useState(false);
  const { category } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    axios.get("http://localhost:5000/api/articles")
      .then(res => setArticles(res.data))
      .catch(console.error);
  }, []);

  
  useEffect(() => {
    if (!category || category === "toate") {
      setFiltered(articles);
    } else {
      setFiltered(articles.filter(a => a.category.toLowerCase() === category));
    }
  }, [category, articles]);

  
  const handleDelete = id => {
    axios.delete(`http://localhost:5000/api/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => setArticles(prev => prev.filter(a => a._id !== id)))
    .catch(err => alert(err.response?.data?.message || "Delete failed"));
  };

  
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 200 && !showAd1) {
        setShowAd1(true);
      }
      if (y > 800 && showAd1 && !showAd2) {
        setShowAd2(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAd1, showAd2]);

  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Articles";

  return (
    <>
      
      <div className="relative w-full h-40">
        <img src={newsPaper} alt={title} className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: darkMode ? 0.6 : 0.4 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-semibold uppercase drop-shadow-lg">
            {title}
          </h1>
        </div>
        {user && (
          <button
            onClick={() => navigate("/publish")}
            className="absolute top-6 right-8 text-white p-4 rounded-full shadow-xl transition-colors duration-300"
            style={{ backgroundColor: darkMode ? "#374151" : "#3B82F6" }}
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
              {filtered.map(a => (
                <ArticleCard
                  key={a._id}
                  article={a}
                  user={user}
                  showDeleteButton={Boolean(
                    user && a.authorId && a.authorId.toString() === user._id
                  )}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      
      {showAd1 && (
        <Comercial position="right" offsetY="20%" onClose={() => setShowAd1(false)}>
          <span>reclama ta:D</span>
        </Comercial>
      )}
      {showAd2 && (
        <Comercial position="left" offsetY="60%" onClose={() => setShowAd2(false)}>
          <span>reclama ta:D</span>
        </Comercial>
      )}
    </>
  );
}
