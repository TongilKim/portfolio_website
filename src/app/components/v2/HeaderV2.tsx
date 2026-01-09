import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function HeaderV2() {
  const { t } = useTranslation();
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
          <div className="text-xl">{t('app.title')}</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollToSection("home")} className="hover:underline">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection("services")} className="hover:underline">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection("work")} className="hover:underline">
              {t('nav.work')}
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:underline">
              {t('nav.contact')}
            </button>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? t('nav.close') : t('nav.menu')}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 flex flex-col gap-4 text-sm">
            <button onClick={() => scrollToSection("home")} className="text-left">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection("services")} className="text-left">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollToSection("work")} className="text-left">
              {t('nav.work')}
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-left">
              {t('nav.contact')}
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
