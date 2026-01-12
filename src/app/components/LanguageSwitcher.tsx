import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
	const { i18n, t } = useTranslation();

	const toggleLanguage = () => {
		const newLang = i18n.language.startsWith("en") ? "ko" : "en";
		i18n.changeLanguage(newLang);
	};

	const currentLangLabel = i18n.language.startsWith("en")
		? t("language.en")
		: t("language.ko");

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={toggleLanguage}
			className="flex items-center gap-2"
		>
			<Globe className="h-4 w-4" />
			<span>{currentLangLabel}</span>
		</Button>
	);
}
