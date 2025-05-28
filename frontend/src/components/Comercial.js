import { useState, useEffect } from "react";

export default function Comercial({
  position = "right",    
  offsetY = "20%",       
  children,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  
  const baseClasses =
    "fixed p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 transition-transform duration-500 ease-out";
  const posClasses = position === "right" ? "right-4" : "left-4";
  const translateClass = visible
    ? "translate-x-0"
    : position === "right"
    ? "translate-x-full"
    : "-translate-x-full";

  return (
    <div
      style={{ top: offsetY }}
      className={`${baseClasses} ${posClasses} ${translateClass}`}
    >
     
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        title="Închide"
      >
        &times;
      </button>

      
      <div className="w-40 h-24 flex items-center justify-center text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
