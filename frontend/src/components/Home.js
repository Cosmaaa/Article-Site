import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import CategorySideBar from "./CategorySideBar";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) =>
        console.error("Eroare la încărcarea articolelor:", err)
      );
  }, []);

  useEffect(() => {
    if (!category || category === "toate") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((a) => a.category === category)
      );
    }
  }, [category, articles]);

  return (
    <div className="flex mt-8 px-4">
      <CategorySideBar />
      <div className="flex flex-col items-center gap-6 flex-grow">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))
        ) : (
          <p className="text-gray-500 text-xl mt-10">Nu există articole în această categorie.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
