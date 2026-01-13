import {
	ArrowRight,
	Briefcase,
	Code,
	FileText,
	ShoppingCart,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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
		<section id="services" className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4">{t("services.title")}</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						{t("services.description")}
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{services.map((service, index) => {
						const Icon = iconMap[index] || Code;
						return (
							<Card
								key={service.title}
								className="border-2 hover:border-blue-500 transition-all hover:shadow-lg group h-full flex flex-col"
							>
								<CardHeader>
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
										<Icon
											className="text-blue-600 group-hover:text-white transition-colors"
											size={24}
										/>
									</div>
									<CardTitle className="text-xl">{service.title}</CardTitle>
								</CardHeader>
								<CardContent className="flex-1 flex flex-col">
									<CardDescription className="text-base flex-1">
										{service.description}
									</CardDescription>
									<p className="text-sm text-blue-600 font-medium mt-4">
										{t("services.idealForLabel")}: {service.idealFor}
									</p>
									<Link to="/contact" className="w-full block">
										<Button
											variant="outline"
											className="w-full mt-4 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors"
										>
											{t("services.cta.card")}
											<ArrowRight size={16} className="ml-2" />
										</Button>
									</Link>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Section CTA */}
				<div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 md:p-12">
					<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
						{t("services.cta.section")}
					</h3>
					<p className="text-blue-100 mb-6 max-w-xl mx-auto">
						{t("services.cta.sectionDescription")}
					</p>
					<Link to="/contact">
						<Button
							size="lg"
							className="bg-white text-blue-600 hover:bg-blue-50"
						>
							{t("services.cta.button")}
							<ArrowRight size={18} className="ml-2" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
