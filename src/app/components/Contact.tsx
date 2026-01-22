import { useTranslation } from "react-i18next";
import { AnimatedSection } from "./AnimatedSection";
import { ContactForm, KakaoContactCard } from "./ContactForm";

export function Contact() {
	const { t, i18n } = useTranslation();
	const isKorean = i18n.language.startsWith("ko");

	return (
		<section id="contact" className="py-12 sm:py-16 md:py-20 bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-12 sm:mb-16">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
						{t("contact.title")}
					</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
						{t("contact.description")}
					</p>
				</AnimatedSection>

				<div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
					<AnimatedSection direction="left" className="space-y-6 sm:space-y-8">
						<div>
							<h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
								{t("contact.getInTouch.title")}
							</h3>
							<p className="text-gray-300 mb-8">
								{t("contact.getInTouch.description")}
							</p>
						</div>

						{isKorean && <KakaoContactCard />}
					</AnimatedSection>

					<AnimatedSection direction="right" delay={0.2}>
						<ContactForm />
					</AnimatedSection>
				</div>
			</div>
		</section>
	);
}
