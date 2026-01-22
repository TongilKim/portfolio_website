import { motion } from "framer-motion";
import {
	ArrowRight,
	Briefcase,
	Code,
	FileText,
	ShoppingCart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
	AnimatedSection,
	StaggerContainer,
	staggerItemVariants,
} from "./AnimatedSection";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

const iconMap = [ShoppingCart, Briefcase, FileText, Code];

interface ServiceItem {
	title: string;
	description: string;
	idealFor: string;
}

export function Services() {
	const { t } = useTranslation();
	const services = t("services.items", {
		returnObjects: true,
	}) as ServiceItem[];

	return (
		<section id="services" className="py-12 sm:py-16 md:py-20 bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-12 sm:mb-16">
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 text-white">{t("services.title")}</h2>
					<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
						{t("services.description")}
					</p>
				</AnimatedSection>

				<StaggerContainer className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8" staggerDelay={0.15}>
					{services.map((service, index) => {
						const Icon = iconMap[index] || Code;
						return (
							<motion.div key={service.title} variants={staggerItemVariants}>
								<Card className="border-2 border-gray-700 hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10 group h-full flex flex-col bg-gray-800">
									<CardHeader>
										<div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
											<Icon
												className="text-blue-400 group-hover:text-white transition-colors"
												size={24}
											/>
										</div>
										<CardTitle className="text-xl text-white">{service.title}</CardTitle>
									</CardHeader>
									<CardContent className="flex-1 flex flex-col">
										<CardDescription className="text-base flex-1 text-gray-300">
											{service.description}
										</CardDescription>
										<p className="text-sm text-blue-400 font-medium mt-4">
											{t("services.idealForLabel")}: {service.idealFor}
										</p>
										<Link to="/contact" className="w-full block">
											<Button
												variant="outline"
												className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors"
											>
												{t("services.cta.card")}
												<ArrowRight size={16} className="ml-2" />
											</Button>
										</Link>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</StaggerContainer>

				{/* Section CTA */}
				<AnimatedSection delay={0.3} className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-500/30">
					<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
						{t("services.cta.section")}
					</h3>
					<p className="text-blue-100 mb-6 max-w-xl mx-auto">
						{t("services.cta.sectionDescription")}
					</p>
					<Link to="/contact">
						<Button
							size="lg"
							className="bg-white text-blue-600 hover:bg-gray-100"
						>
							{t("services.cta.button")}
							<ArrowRight size={18} className="ml-2" />
						</Button>
					</Link>
				</AnimatedSection>
			</div>
		</section>
	);
}
