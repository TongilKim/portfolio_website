import { useTranslation } from "react-i18next";

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/sL7Kr6bi";

export function KakaoChatFloatingButton() {
	const { t, i18n } = useTranslation();

	if (!i18n.language.startsWith("ko")) {
		return null;
	}

	return (
		<a
			href={KAKAO_OPEN_CHAT_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] font-semibold px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			aria-label={t("kakao.floatingButton")}
		>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.31 4.73 6.72-.15.54-.81 2.93-.84 3.13 0 0-.02.13.05.19.07.05.16.03.16.03.21-.03 2.43-1.57 3.44-2.23.78.12 1.6.18 2.46.18 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
			</svg>
			<span className="hidden sm:inline">{t("kakao.chatButton")}</span>
		</a>
	);
}
