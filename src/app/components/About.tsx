import { ArrowRight, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AnimatedSection } from "./AnimatedSection";

export function About() {
	const { t } = useTranslation();
	const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];
	const skills = t("about.skills", { returnObjects: true }) as string[];

	return (
		<section id="about" className="py-20 bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<AnimatedSection direction="left">
						<h2 className="text-4xl md:text-5xl mb-6 text-white">{t("about.title")}</h2>
						<div className="space-y-4 text-lg text-gray-300">
							{paragraphs.map((paragraph) => (
								<p key={paragraph}>{paragraph}</p>
							))}
						</div>
						<Link
							to="/about"
							className="inline-flex items-center mt-6 text-blue-400 font-medium hover:underline"
						>
							{t("about.learnMore")}
							<ArrowRight size={18} className="ml-2" />
						</Link>
					</AnimatedSection>

					<AnimatedSection direction="right" delay={0.2}>
						<h3 className="text-2xl font-bold mb-6 text-white">
							{t("about.skillsTitle")}
						</h3>
						<div className="grid grid-cols-2 gap-4">
							{skills.map((skill) => (
								<div key={skill} className="flex items-center gap-2 text-gray-200">
									<CheckCircle
										className="text-green-400 flex-shrink-0"
										size={20}
									/>
									<span>{skill}</span>
								</div>
							))}
						</div>

						<div className="mt-8 p-6 bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
							<p className="text-lg italic text-gray-200">"{t("about.quote")}"</p>
						</div>
					</AnimatedSection>
				</div>
			</div>
		</section>
	);
}
