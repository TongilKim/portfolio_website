import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	AnimatedSection,
	StaggerContainer,
	staggerItemVariants,
} from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const projectImages = [
	"https://images.unsplash.com/photo-1710799885122-428e63eff691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY3ODgyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
	"https://images.unsplash.com/photo-1742454582165-deab666a8763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZXxlbnwxfHx8fDE3Njc5MzQyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
	"https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY3OTEyNDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const projectTags = [
	["React", "Tailwind CSS", "Motion"],
	["Next.js", "Stripe", "Database"],
	["React", "TypeScript", "Analytics"],
];

interface ProjectItem {
	title: string;
	description: string;
}

export function Portfolio() {
	const { t } = useTranslation();
	const projects = t("portfolio.projects", {
		returnObjects: true,
	}) as ProjectItem[];

	return (
		<section id="portfolio" className="py-12 sm:py-16 md:py-20 bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-12 sm:mb-16">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-white">{t("portfolio.title")}</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
						{t("portfolio.description")}
					</p>
				</AnimatedSection>

				<StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" staggerDelay={0.15}>
					{projects.map((project, index) => (
						<motion.div key={project.title} variants={staggerItemVariants}>
							<Card className="group overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-shadow bg-gray-900 border-gray-700 h-full">
								<div className="relative overflow-hidden">
									<ImageWithFallback
										src={projectImages[index]}
										alt={project.title}
										className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
										<ExternalLink className="text-white" size={32} />
									</div>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
									<p className="text-gray-300 mb-4">{project.description}</p>
									<div className="flex flex-wrap gap-2">
										{projectTags[index]?.map((tag) => (
											<Badge key={tag} variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600">
												{tag}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</StaggerContainer>
			</div>
		</section>
	);
}
