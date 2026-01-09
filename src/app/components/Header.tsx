import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    } else {
      // Navigate to home with hash
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-blue-600">{t('app.title')}</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition-colors">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:text-blue-600 transition-colors">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="hover:text-blue-600 transition-colors">
              {t('nav.portfolio')}
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-blue-600 transition-colors">
              {t('nav.about')}
            </button>
            <Link to="/faq" className="hover:text-blue-600 transition-colors">
              {t('nav.faq')}
            </Link>
            <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600 transition-colors">
              {t('nav.contact')}
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button onClick={() => scrollToSection("contact")}>
              {t('nav.getStarted')}
            </Button>
          </div>

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
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left hover:text-blue-600 transition-colors">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="text-left hover:text-blue-600 transition-colors">
              {t('nav.portfolio')}
            </button>
            <button onClick={() => scrollToSection("about")} className="text-left hover:text-blue-600 transition-colors">
              {t('nav.about')}
            </button>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-left hover:text-blue-600 transition-colors">
              {t('nav.faq')}
            </Link>
            <button onClick={() => scrollToSection("contact")} className="text-left hover:text-blue-600 transition-colors">
              {t('nav.contact')}
            </button>
            <div className="pt-2 border-t">
              <LanguageSwitcher />
            </div>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full"
            >
              {t('nav.getStarted')}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
