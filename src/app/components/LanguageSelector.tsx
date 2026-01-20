import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";

const languages = [
	{ code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
	{ code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
];

export function LanguageSelector() {
	const { i18n } = useTranslation();

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode);
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
							lang.code === i18n.language ? "bg-blue-900/50" : ""
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
interface InlineLanguageSelectorProps {
	onLanguageChange?: () => void;
}

export function InlineLanguageSelector({ onLanguageChange }: InlineLanguageSelectorProps) {
	const { i18n } = useTranslation();

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode);
		localStorage.setItem("preferredLanguage", langCode);
		onLanguageChange?.();
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