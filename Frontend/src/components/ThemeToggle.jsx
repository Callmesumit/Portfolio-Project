import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 
      w-12 h-12 rounded-full
      bg-muted text-foreground
      flex items-center justify-center
      shadow-lg border
      hover:scale-110 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
