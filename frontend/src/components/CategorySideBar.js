// src/components/CategorySideBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const categories = [
  { label: "All", path: "/" },
  { label: "Sport", path: "/sport" },
  { label: "Lifestyle", path: "/lifestyle" },
  { label: "Tech", path: "/tech" },
  { label: "Latest", path: "/latest" },
];

export default function CategorySideBar() {
  const location = useLocation().pathname;

  return (
    <div className="w-48 flex flex-col gap-3 px-4 py-6">
      {categories.map((cat) => {
        const isActive = location === cat.path;
        return (
          <Link
            key={cat.path}
            to={cat.path}
            className={`block text-center font-medium rounded-lg px-4 py-2 transition
              ${isActive
                ? "bg-blue-800 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"}
            `}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
