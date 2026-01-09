import { useTranslation } from "react-i18next";

export function HeroV2() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8">
            {t('heroV2.title')}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl">
            {t('heroV2.description')}
          </p>

          <button
            onClick={scrollToContact}
            className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
          >
            {t('heroV2.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
