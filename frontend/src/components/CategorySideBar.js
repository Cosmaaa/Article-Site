import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { label: "Toate Articolele", path: "/toate" },
  { label: "Sport", path: "/sport" },
  { label: "Ultima Oră", path: "/ultimaora" },
  { label: "Tehnologie", path: "/tehnologie" },
  { label: "Economie", path: "/economie" },
  { label: "Cultură", path: "/cultura" },
  { label: "Sănătate", path: "/sanatate" },
];

const CategorySidebar = () => {
  const location = useLocation();

  return (
    <div className="w-48 p-4 flex flex-col gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.path}
          to={cat.path}
          className={`px-4 py-2 rounded text-center font-medium ${
            location.pathname === cat.path
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
};

export default CategorySidebar;
