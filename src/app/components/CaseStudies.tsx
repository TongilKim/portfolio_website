import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
	AnimatedSection,
	StaggerContainer,
	staggerItemVariants,
} from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const caseStudyImages = [
	"https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
	"https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

interface CaseStudyItem {
	title: string;
	client: string;
	challenge: string;
	solution: string;
	results: string[];
	tags: string[];
	duration: string;
}

interface MetricItemProps {
	icon: React.ReactNode;
	value: string;
}

function MetricItem({ icon, value }: MetricItemProps) {
	return (
		<div className="flex items-center gap-2 text-sm">
			<span className="text-blue-400">{icon}</span>
			<span className="text-gray-300">{value}</span>
		</div>
	);
}

export function CaseStudies() {
	const { t } = useTranslation();
	const caseStudies = t("caseStudies.items", {
		returnObjects: true,
	}) as CaseStudyItem[];

	return (
		<section id="case-studies" className="py-20 bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4 text-white">
						{t("caseStudies.title")}
					</h2>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("caseStudies.description")}
					</p>
				</AnimatedSection>

				<StaggerContainer
					className="grid md:grid-cols-2 gap-8"
					staggerDelay={0.2}
				>
					{caseStudies.map((study, index) => (
						<motion.div key={study.title} variants={staggerItemVariants}>
							<Card className="overflow-hidden bg-gray-900 border-gray-700 h-full hover:border-blue-500/50 transition-colors">
								<div className="relative">
									<ImageWithFallback
										src={caseStudyImages[index]}
										alt={study.title}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute top-4 left-4">
										<Badge className="bg-blue-600 text-white">
											{study.client}
										</Badge>
									</div>
								</div>
								<CardContent className="p-6 space-y-4">
									<h3 className="text-xl font-bold text-white">{study.title}</h3>

									<div className="space-y-3">
										<div>
											<p className="text-sm font-medium text-blue-400 mb-1">
												{t("caseStudies.challengeLabel")}
											</p>
											<p className="text-gray-400 text-sm">{study.challenge}</p>
										</div>

										<div>
											<p className="text-sm font-medium text-blue-400 mb-1">
												{t("caseStudies.solutionLabel")}
											</p>
											<p className="text-gray-400 text-sm">{study.solution}</p>
										</div>
									</div>

									<div className="pt-4 border-t border-gray-700">
										<p className="text-sm font-medium text-green-400 mb-2">
											{t("caseStudies.resultsLabel")}
										</p>
										<div className="grid grid-cols-2 gap-2">
											{study.results.map((result) => (
												<MetricItem
													key={result}
													icon={<TrendingUp size={14} />}
													value={result}
												/>
											))}
										</div>
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-gray-700">
										<div className="flex flex-wrap gap-2">
											{study.tags.map((tag) => (
												<Badge
													key={tag}
													variant="secondary"
													className="bg-gray-700 text-gray-200 text-xs"
												>
													{tag}
												</Badge>
											))}
										</div>
										<MetricItem
											icon={<Clock size={14} />}
											value={study.duration}
										/>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</StaggerContainer>

				<AnimatedSection className="text-center mt-12">
					<Link
						to="/contact"
						className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
					>
						{t("caseStudies.cta")}
						<ArrowRight size={18} />
					</Link>
				</AnimatedSection>
			</div>
		</section>
	);
}
