import React from "react";
import { FaInfoCircle, FaThumbsUp, FaThumbsDown, FaHeart } from "react-icons/fa";

const ArticleCard = ({ article }) => {
  return (
    <div className="w-full max-w-2xl bg-green-200 rounded-xl p-6 shadow-md">
      <div className="flex items-start gap-3 mb-4">
        <FaInfoCircle className="text-2xl mt-1" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{article.title}</h2>
          <p className="text-gray-700 mt-2">{article.content}</p>
          <span className="text-sm text-gray-500 italic">Categorie: {article.category}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="bg-white border border-gray-400 rounded px-4 py-1 hover:bg-gray-100">Read More</button>
        <div className="flex gap-4 text-xl text-gray-700">
          <FaThumbsUp className="cursor-pointer hover:text-black" />
          <FaThumbsDown className="cursor-pointer hover:text-black" />
          <FaHeart className="cursor-pointer hover:text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
