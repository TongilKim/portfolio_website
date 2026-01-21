import { useTranslation } from "react-i18next";
import { About } from "../app/components/About";
import { Contact } from "../app/components/Contact";
import { Hero } from "../app/components/Hero";
import { IntroAnimation } from "../app/components/IntroAnimation";
import { Portfolio } from "../app/components/Portfolio";
import { SEO } from "../app/components/SEO";
import { Services } from "../app/components/Services";
import { Testimonials } from "../app/components/Testimonials";

interface HomeProps {
	showIntro: boolean;
	onIntroComplete: () => void;
}

export function Home({ showIntro, onIntroComplete }: HomeProps) {
	const { i18n } = useTranslation();
	const isKorean = i18n.language === "ko";

	return (
		<>
			<SEO
				title={isKorean ? "홈" : "Home"}
				description={isKorean
					? "PixelFlow - 혁신적인 웹 솔루션을 제공하는 프리랜스 웹 개발자. React, TypeScript, 모던 웹 기술 전문."
					: "PixelFlow - Freelance web developer delivering innovative web solutions. Specializing in React, TypeScript, and modern web technologies."}
				url="/"
			/>
			{showIntro && <IntroAnimation onComplete={onIntroComplete} />}
			<Hero />
			<Services />
			<Portfolio />
			<Testimonials />
			<About />
			<Contact />
		</>
	);
}
