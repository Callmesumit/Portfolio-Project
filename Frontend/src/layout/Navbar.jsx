import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";



const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];


export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-5"
      }  z-50`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          PORT<span className="text-primary">FOLIO.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
    {/* Right Actions */}
<div className="hidden md:flex items-center gap-3">
  {/* 🌗 Theme Toggle */}
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full border border-border
    hover:bg-muted transition-colors"
    aria-label="Toggle theme"
  >
    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
  </button>

  {/* Contact Button */}
  <a href="#contact">
    <Button size="sm">Contact Me</Button>
  </a>
</div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}

            {/* 🌗 Theme Toggle (Mobile) */}
<button
  onClick={toggleTheme}
  className="flex items-center gap-2 text-lg text-muted-foreground 
  hover:text-foreground py-2"
>
  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
</button>
          
         <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
  <Button>Contact Me</Button>
</a>


          </div>
        </div>
      )}
    </header>
  );
};
