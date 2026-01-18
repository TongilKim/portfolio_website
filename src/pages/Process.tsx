import { Code, Palette, Rocket, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProcessPhase {
	title: string;
	description: string;
	clientExperience: string;
}

const icons = [Search, Palette, Code, Rocket];

export function Process() {
	const { t } = useTranslation();
	const phases = t("process.phases", { returnObjects: true }) as ProcessPhase[];

	return (
		<main className="py-20 bg-gray-900">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
						{t("process.title")}
					</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("process.description")}
					</p>
				</div>

				<div className="space-y-12">
					{phases.map((phase, index) => {
						const Icon = icons[index] || Code;
						const stepNumber = index + 1;

						return (
							<div key={phase.title} className="relative">
								{/* Connector line */}
								{index < phases.length - 1 && (
									<div className="absolute left-6 top-16 w-0.5 h-[calc(100%+1rem)] bg-blue-700 hidden md:block" />
								)}

								<div className="flex gap-6 items-start">
									{/* Step indicator */}
									<div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-blue-500/30">
										<Icon className="text-white" size={24} />
									</div>

									{/* Content */}
									<div className="flex-1 pb-8">
										<div className="flex items-center gap-3 mb-2">
											<span className="text-sm font-medium text-blue-400">
												{t("process.step")} {stepNumber}
											</span>
										</div>
										<h2 className="text-2xl font-bold mb-3 text-white">{phase.title}</h2>
										<p className="text-gray-300 mb-4">{phase.description}</p>

										{/* Client experience */}
										<div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700/50">
											<h3 className="text-sm font-semibold text-blue-400 mb-2">
												{t("process.clientLabel")}
											</h3>
											<p className="text-gray-300">{phase.clientExperience}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Timeline summary */}
				<div className="mt-16 bg-gray-800 rounded-2xl p-8 border border-gray-700">
					<h3 className="text-xl font-bold mb-4 text-center text-white">
						{t("process.timeline.title")}
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						{(
							t("process.timeline.items", { returnObjects: true }) as {
								type: string;
								duration: string;
							}[]
						).map((item) => (
							<div key={item.type} className="p-4">
								<div className="text-2xl font-bold text-blue-400">
									{item.duration}
								</div>
								<div className="text-sm text-gray-400">{item.type}</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 border border-blue-500/30">
					<h3 className="text-2xl font-bold text-white mb-4">
						{t("process.cta.title")}
					</h3>
					<p className="text-blue-100 mb-6">{t("process.cta.description")}</p>
					<a
						href="/contact"
						className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors"
					>
						{t("process.cta.button")}
					</a>
				</div>
			</div>
		</main>
	);
}
