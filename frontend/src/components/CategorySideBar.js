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
    <div className="relative z-20 w-48 flex flex-col gap-3 px-4 py-6">
      {categories.map((cat) => {
        const isActive = location === cat.path;
        return (
          <Link
            key={cat.path}
            to={cat.path}
            className={`block text-center font-medium rounded-lg px-4 py-2 transition text-white
              ${isActive
                ? "bg-blue-700 dark:bg-gray-700"
                : "bg-blue-600 dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700"}
            `}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
