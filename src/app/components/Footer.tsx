import { Github, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  const servicesList = t('footer.servicesList', { returnObjects: true }) as string[];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-4">{t('app.title')}</div>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="cursor-pointer hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#services" className="cursor-pointer hover:text-white transition-colors">{t('nav.services')}</a></li>
              <li><a href="#portfolio" className="cursor-pointer hover:text-white transition-colors">{t('nav.portfolio')}</a></li>
              <li><a href="#about" className="cursor-pointer hover:text-white transition-colors">{t('nav.about')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-2 text-gray-400">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <a href="#" className="cursor-pointer hover:text-white transition-colors">{service}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
