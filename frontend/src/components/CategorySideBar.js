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
    <div className="w-48 p-4 flex flex-col gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.path}
          to={cat.path}
          className={`px-4 py-2 rounded-full text-center font-medium transition-colors ${
            location === cat.path
              ? "bg-green-600 text-white"
              : "bg-green-300 text-black hover:bg-green-400"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
