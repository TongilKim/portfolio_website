import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { ContactForm, KakaoContactCard } from "@/app/components/ContactForm";
import { SEO } from "@/app/components/SEO";

export function ContactPage() {
	const { t, i18n } = useTranslation();
	const isKorean = i18n.language.startsWith("ko");

	return (
		<main className="py-20 bg-gray-900">
			<SEO
				title={isKorean ? "문의하기" : "Contact"}
				description={
					isKorean
						? "PixelFlow에 프로젝트 문의하기. 웹사이트, 웹 애플리케이션, 맞춤형 솔루션 개발 상담."
						: "Contact PixelFlow for your next project. Get a quote for custom websites, web applications, and tailored solutions."
				}
				url="/contact"
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
						{t("contact.title")}
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("contact.description")}
					</p>
				</AnimatedSection>

				<div className="grid md:grid-cols-2 gap-12">
					<AnimatedSection className="space-y-8" delay={0.1} direction="left">
						<div>
							<h2 className="text-2xl font-bold mb-6 text-white">
								{t("contact.getInTouch.title")}
							</h2>
							<p className="text-gray-300 mb-8">
								{t("contact.getInTouch.description")}
							</p>
						</div>

						{isKorean && <KakaoContactCard />}
					</AnimatedSection>

					<AnimatedSection delay={0.2} direction="right">
						<ContactForm />
					</AnimatedSection>
				</div>
			</div>
		</main>
	);
}
