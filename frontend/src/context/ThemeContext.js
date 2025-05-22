import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
  setDarkMode: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => setDarkMode(prev => !prev);

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
