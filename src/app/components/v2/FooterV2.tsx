import { useTranslation } from "react-i18next";

export function FooterV2() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="text-xl mb-2">{t('app.title')}</div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} {t('footerV2.copyright')}
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-black">
              {t('footerV2.social.twitter')}
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              {t('footerV2.social.linkedin')}
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              {t('footerV2.social.github')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
