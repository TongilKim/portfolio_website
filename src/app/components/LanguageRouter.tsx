import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useParams } from "react-router-dom";

interface LanguageRouterProps {
	children: React.ReactNode;
}

export function LanguageRouter({ children }: LanguageRouterProps) {
	const { i18n } = useTranslation();
	const location = useLocation();
	const params = useParams();

	// Extract language from URL path
	const pathSegments = location.pathname.split("/").filter(Boolean);
	const urlLang = pathSegments[0];
	const isValidLang = ["ko", "en"].includes(urlLang);

	useEffect(() => {
		// If URL has a valid language, use it
		if (isValidLang && urlLang !== i18n.language) {
			i18n.changeLanguage(urlLang);
		}
	}, [urlLang, isValidLang, i18n]);

	// If no language in URL, redirect to URL with current language
	if (!isValidLang) {
		const currentLang = i18n.language === "ko" ? "ko" : "en";
		const newPath = `/${currentLang}${location.pathname}${location.search}${location.hash}`;
		return <Navigate to={newPath} replace />;
	}

	return <>{children}</>;
}

// Helper function to get localized path
export function getLocalizedPath(path: string, language: string): string {
	// Remove any existing language prefix
	const cleanPath = path.replace(/^\/(ko|en)/, "");
	// Add the new language prefix
	return `/${language}${cleanPath}`;
}

// Helper function to get alternate language links for SEO
export function getAlternateLinks(currentPath: string): { lang: string; url: string }[] {
	const cleanPath = currentPath.replace(/^\/(ko|en)/, "");

	return [
		{ lang: "ko", url: getLocalizedPath(cleanPath, "ko") },
		{ lang: "en", url: getLocalizedPath(cleanPath, "en") },
	];
}