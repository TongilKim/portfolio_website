import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600">WebCraft</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:text-blue-600 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="hover:text-blue-600 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-blue-600 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600 transition-colors">
              Contact
            </button>
          </nav>

          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:block"
          >
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("home")} className="text-left hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left hover:text-blue-600 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-left hover:text-blue-600 transition-colors">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left hover:text-blue-600 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left hover:text-blue-600 transition-colors">
              Contact
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full"
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
