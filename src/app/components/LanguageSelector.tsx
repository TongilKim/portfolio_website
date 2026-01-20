import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { getLocalizedPath } from "./LanguageRouter";

const languages = [
	{ code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
	{ code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
];

export function LanguageSelector() {
	const { i18n } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

	const handleLanguageChange = (langCode: string) => {
		// Change the language
		i18n.changeLanguage(langCode);

		// Update the URL to reflect the new language
		const newPath = getLocalizedPath(location.pathname, langCode);
		navigate(newPath);

		// Store preference in localStorage
		localStorage.setItem("preferredLanguage", langCode);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="gap-2 text-gray-300 hover:text-white"
					aria-label="Select language"
				>
					<Globe className="h-4 w-4" />
					<span className="hidden sm:inline-block">
						{currentLanguage.flag} {currentLanguage.nativeName}
					</span>
					<span className="sm:hidden">{currentLanguage.flag}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => handleLanguageChange(lang.code)}
						className={`cursor-pointer ${
							lang.code === i18n.language ? "bg-blue-50 dark:bg-blue-950" : ""
						}`}
					>
						<span className="mr-2">{lang.flag}</span>
						<div className="flex flex-col">
							<span className="font-medium">{lang.nativeName}</span>
							<span className="text-xs text-gray-500">{lang.name}</span>
						</div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// Inline language switcher for mobile menu
export function InlineLanguageSelector() {
	const { i18n } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode);
		const newPath = getLocalizedPath(location.pathname, langCode);
		navigate(newPath);
		localStorage.setItem("preferredLanguage", langCode);
	};

	return (
		<div className="flex items-center gap-2 px-4 py-2">
			<Globe className="h-4 w-4 text-gray-400" />
			<div className="flex gap-2">
				{languages.map((lang) => (
					<button
						key={lang.code}
						onClick={() => handleLanguageChange(lang.code)}
						className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
							lang.code === i18n.language
								? "bg-blue-600 text-white"
								: "bg-gray-700 text-gray-300 hover:bg-gray-600"
						}`}
						aria-label={`Switch to ${lang.name}`}
					>
						{lang.flag} {lang.nativeName}
					</button>
				))}
			</div>
		</div>
	);
}