import { Code, Heart, Lightbulb, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AboutPage() {
	const { t } = useTranslation();
	const skills = t("aboutPage.skills", { returnObjects: true }) as string[];
	const values = t("aboutPage.values", { returnObjects: true }) as {
		title: string;
		description: string;
	}[];

	const valueIcons = [Heart, Lightbulb, Users, Code];

	return (
		<main className="py-20 bg-gray-900">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Hero section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
						{t("aboutPage.title")}
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("aboutPage.subtitle")}
					</p>
				</div>

				{/* Story section */}
				<div className="prose prose-lg max-w-none mb-16">
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
				</div>

				{/* Values section */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold mb-8 text-center text-white">
						{t("aboutPage.valuesTitle")}
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{values.map((value, index) => {
							const Icon = valueIcons[index] || Code;
							return (
								<div key={value.title} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
									<div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
										<Icon className="text-blue-400" size={20} />
									</div>
									<h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
									<p className="text-gray-300">{value.description}</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Skills section */}
				<div className="mb-16">
					<h2 className="text-2xl font-bold mb-6 text-center text-white">
						{t("aboutPage.skillsTitle")}
					</h2>
					<div className="flex flex-wrap justify-center gap-3">
						{skills.map((skill) => (
							<span
								key={skill}
								className="px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium border border-blue-700/50"
							>
								{skill}
							</span>
						))}
					</div>
				</div>

				{/* Quote */}
				<div className="text-center bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-2xl p-8 mb-16 border border-blue-700/30">
					<blockquote className="text-xl md:text-2xl font-medium text-gray-200 italic">
						"{t("aboutPage.quote")}"
					</blockquote>
				</div>

				{/* CTA */}
				<div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 border border-blue-500/30">
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
				</div>
			</div>
		</main>
	);
}
