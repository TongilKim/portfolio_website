/**
 * Language detection utilities for internationalization
 */

const SUPPORTED_LANGUAGES = ["ko", "en"] as const;
type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

const DEFAULT_LANGUAGE: SupportedLanguage = "en";

/**
 * Detects user's preferred language from various sources
 * Priority: URL > localStorage > browser > default
 */
export function detectUserLanguage(): SupportedLanguage {
  // 1. Check URL path
  const pathLang = getLanguageFromPath();
  if (pathLang) return pathLang;

  // 2. Check localStorage for saved preference
  const savedLang = getLanguageFromStorage();
  if (savedLang) return savedLang;

  // 3. Check browser language
  const browserLang = getLanguageFromBrowser();
  if (browserLang) return browserLang;

  // 4. Return default
  return DEFAULT_LANGUAGE;
}

/**
 * Gets language from URL path
 */
function getLanguageFromPath(): SupportedLanguage | null {
  const path = window.location.pathname;
  const pathSegments = path.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  if (SUPPORTED_LANGUAGES.includes(firstSegment as SupportedLanguage)) {
    return firstSegment as SupportedLanguage;
  }

  return null;
}

/**
 * Gets saved language preference from localStorage
 */
function getLanguageFromStorage(): SupportedLanguage | null {
  try {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
      return saved as SupportedLanguage;
    }

    // Also check i18next storage
    const i18nextLang = localStorage.getItem("i18nextLng");
    if (i18nextLang) {
      const lang = i18nextLang.split("-")[0] as SupportedLanguage;
      if (SUPPORTED_LANGUAGES.includes(lang)) {
        return lang;
      }
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return null;
}

/**
 * Gets language from browser settings
 */
function getLanguageFromBrowser(): SupportedLanguage | null {
  try {
    // Get browser languages
    const languages = navigator.languages || [navigator.language];

    for (const lang of languages) {
      const shortLang = lang.split("-")[0].toLowerCase() as SupportedLanguage;
      if (SUPPORTED_LANGUAGES.includes(shortLang)) {
        return shortLang;
      }
    }
  } catch (error) {
    console.error("Error detecting browser language:", error);
  }

  return null;
}

/**
 * Saves language preference to localStorage
 */
export function saveLanguagePreference(language: SupportedLanguage): void {
  try {
    localStorage.setItem("preferredLanguage", language);
    localStorage.setItem("i18nextLng", language);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
}

/**
 * Gets the opposite language for language switcher
 */
export function getAlternateLanguage(current: string): SupportedLanguage {
  return current === "ko" ? "en" : "ko";
}

/**
 * Formats language code for display
 */
export function formatLanguageDisplay(lang: string): string {
  const displayNames: Record<string, string> = {
    ko: "한국어",
    en: "English",
  };

  return displayNames[lang] || lang;
}

/**
 * Gets language-specific meta tags for SEO
 */
export function getLanguageMetaTags(language: string) {
  const isKorean = language === "ko";

  return {
    title: isKorean
      ? "PixelFlow | 프리랜스 웹 개발자"
      : "PixelFlow | Freelance Web Developer",
    description: isKorean
      ? "전문 프리랜스 웹 개발자. React, TypeScript, 모던 웹 기술 전문."
      : "Professional freelance web developer. Specializing in React, TypeScript, and modern web technologies.",
    keywords: isKorean
      ? "웹 개발자, 프리랜서, React, TypeScript, 웹사이트, 웹 애플리케이션"
      : "web developer, freelance, React, TypeScript, websites, web applications",
    locale: isKorean ? "ko_KR" : "en_US",
    langCode: language,
  };
}