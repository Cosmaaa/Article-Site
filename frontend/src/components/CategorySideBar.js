import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { label: "All", path: "/toate" },
  { label: "Sport", path: "/sport" },
  { label: "Lifestyle", path: "/lifestyle" },
  { label: "Tech", path: "/tehnologie" },
  { label: "Latest", path: "/ultimaora" },
];

const CategorySideBar = () => {
  const location = useLocation();

  return (
    <div className="w-44 flex flex-col gap-3 pt-2">
      {categories.map((cat) => (
        <Link
          key={cat.path}
          to={cat.path}
          className={`px-4 py-2 rounded-full font-semibold text-center transition-colors duration-150 shadow-sm ${
            location.pathname === cat.path
              ? "bg-green-600 text-white"
              : "bg-green-300 text-black hover:bg-green-400"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
};

export default CategorySideBar;