import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <Sparkles size={16} />
              <span className="text-sm">{t('hero.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl">
              {t('hero.title')}
              <span className="text-blue-600"> {t('hero.titleHighlight')}</span>
            </h1>

            <p className="text-xl text-gray-600">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={scrollToContact} className="gap-2">
                {t('hero.cta.start')}
                <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToPortfolio} className="gap-2">
                <Code2 size={20} />
                {t('hero.cta.portfolio')}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('hero.stats.projects')}</div>
                <div className="text-sm text-gray-600">{t('hero.stats.projectsLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('hero.stats.satisfaction')}</div>
                <div className="text-sm text-gray-600">{t('hero.stats.satisfactionLabel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">{t('hero.stats.experience')}</div>
                <div className="text-sm text-gray-600">{t('hero.stats.experienceLabel')}</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
            <ImageWithFallback
              eager
              src="https://images.unsplash.com/photo-1622131815526-eaae1e615381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzY3ODI5MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Modern workspace with laptop"
              className="relative rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
