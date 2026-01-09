import { useState } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function HeaderV2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="text-xl">WebCraft</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollToSection("home")} className="hover:underline">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:underline">
              Services
            </button>
            <button onClick={() => scrollToSection("work")} className="hover:underline">
              Work
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:underline">
              Contact
            </button>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 flex flex-col gap-4 text-sm">
            <button onClick={() => scrollToSection("home")} className="text-left">
              Home
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left">
              Services
            </button>
            <button onClick={() => scrollToSection("work")} className="text-left">
              Work
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left">
              Contact
            </button>
            <div className="pt-2 border-t">
              <LanguageSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
