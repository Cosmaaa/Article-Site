import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
      <p className="text-gray-700 mb-4">{article.content}</p>
      <span className="text-sm text-gray-500 italic">Categorie: {article.category}</span>
    </div>
  );
};

export default ArticleCard;
