import { useTranslation } from "react-i18next";

export function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-8">
					<div className="text-2xl font-bold text-blue-400 mb-4">
						{t("app.title")}
					</div>
					<p className="text-gray-400 max-w-2xl mx-auto">
						{t("footer.description")}
					</p>
				</div>

				<div className="border-t border-gray-800 pt-8 text-center text-gray-400">
					<p>
						&copy; {new Date().getFullYear()} {t("footer.copyright")}
					</p>
				</div>
			</div>
		</footer>
	);
}
