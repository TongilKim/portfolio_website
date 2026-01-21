import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { detectUserLanguage } from "./lib/languageDetection";

import enTranslation from "./locales/en/translation.json";
import koTranslation from "./locales/ko/translation.json";

// Get initial language
const initialLanguage = detectUserLanguage();

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: enTranslation },
			ko: { translation: koTranslation },
		},
		lng: initialLanguage, // Set initial language
		fallbackLng: "en",
		debug: import.meta.env.DEV,
		interpolation: {
			escapeValue: false, // React already escapes
		},
		detection: {
			order: ["path", "localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
			lookupLocalStorage: "preferredLanguage",
			lookupFromPathIndex: 0,
		},
		supportedLngs: ["ko", "en"],
		load: "languageOnly", // ignore region codes
	});

export default i18n;
