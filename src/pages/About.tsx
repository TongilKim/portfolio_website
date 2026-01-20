import { Code, Heart, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "../app/components/AnimatedSection";
import { SEO } from "../app/components/SEO";

export function AboutPage() {
	const { t, i18n } = useTranslation();
	const isKorean = i18n.language === "ko";
	const skills = t("aboutPage.skills", { returnObjects: true }) as string[];
	const values = t("aboutPage.values", { returnObjects: true }) as {
		title: string;
		description: string;
	}[];

	const valueIcons = [Heart, Lightbulb, Users, Code];

	return (
		<main className="py-20 bg-gray-900">
			<SEO
				title={isKorean ? "소개" : "About"}
				description={isKorean
					? "PixelFlow 웹 개발자 소개 - 10년 이상의 경험을 가진 풀스택 개발자. React, Node.js, 클라우드 솔루션 전문."
					: "About PixelFlow - Full-stack developer with 10+ years of experience. Specializing in React, Node.js, and cloud solutions."}
				url="/about"
			/>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero section */}
				<AnimatedSection className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
						{t("aboutPage.title")}
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("aboutPage.subtitle")}
					</p>
				</AnimatedSection>

				{/* Story section */}
				<AnimatedSection className="prose prose-lg max-w-none mb-16" delay={0.1}>
					<h2 className="text-2xl font-bold mb-6 text-white">
						{t("aboutPage.story.title")}
					</h2>
					{(
						t("aboutPage.story.paragraphs", { returnObjects: true }) as string[]
					).map((paragraph) => (
						<p key={paragraph} className="text-gray-300 mb-4">
							{paragraph}
						</p>
					))}
				</AnimatedSection>

				{/* Values section */}
				<AnimatedSection className="mb-16" delay={0.2}>
					<h2 className="text-2xl font-bold mb-8 text-center text-white">
						{t("aboutPage.valuesTitle")}
					</h2>
					<StaggerContainer className="grid md:grid-cols-2 gap-6">
						{values.map((value, index) => {
							const Icon = valueIcons[index] || Code;
							return (
								<motion.div
									key={value.title}
									variants={staggerItemVariants}
									className="bg-gray-800 rounded-lg p-6 border border-gray-700"
								>
									<div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
										<Icon className="text-blue-400" size={20} />
									</div>
									<h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
									<p className="text-gray-300">{value.description}</p>
								</motion.div>
							);
						})}
					</StaggerContainer>
				</AnimatedSection>

				{/* Skills section */}
				<AnimatedSection className="mb-16" delay={0.3}>
					<h2 className="text-2xl font-bold mb-6 text-center text-white">
						{t("aboutPage.skillsTitle")}
					</h2>
					<StaggerContainer className="flex flex-wrap justify-center gap-3">
						{skills.map((skill) => (
							<motion.span
								key={skill}
								variants={staggerItemVariants}
								className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium border border-blue-700/50"
							>
								{skill}
							</motion.span>
						))}
					</StaggerContainer>
				</AnimatedSection>

				{/* Quote */}
				<AnimatedSection className="text-center bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-2xl p-8 mb-16 border border-blue-700/30" delay={0.4}>
					<blockquote className="text-xl md:text-2xl font-medium text-gray-200 italic">
						"{t("aboutPage.quote")}"
					</blockquote>
				</AnimatedSection>

				{/* CTA */}
				<AnimatedSection className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 border border-blue-500/30" delay={0.5}>
					<h3 className="text-2xl font-bold text-white mb-4">
						{t("aboutPage.cta.title")}
					</h3>
					<p className="text-blue-100 mb-6">{t("aboutPage.cta.description")}</p>
					<a
						href="/contact"
						className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors"
					>
						{t("aboutPage.cta.button")}
					</a>
				</AnimatedSection>
			</div>
		</main>
	);
}
