import {
	ChevronDown,
	MessageSquare,
	FileText,
	FileCheck,
	Code,
	CheckCircle,
	Rocket,
	type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "@/app/components/AnimatedSection";
import { SEO } from "@/app/components/SEO";

const iconMap: Record<string, LucideIcon> = {
	MessageSquare,
	FileText,
	FileCheck,
	Code,
	CheckCircle,
	Rocket,
};

interface ProcessStep {
	icon: string;
	title: string;
	description: string;
}

interface FAQItem {
	question: string;
	answer: string;
}

interface FAQSection {
	title: string;
	items: FAQItem[];
}

function AccordionItem({ question, answer }: FAQItem) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b border-gray-700">
			<button
				type="button"
				className="w-full py-4 flex justify-between items-center text-left cursor-pointer text-gray-200 hover:text-blue-400 transition-colors"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="font-medium pr-4">{question}</span>
				<ChevronDown
					size={20}
					className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 ${
					isOpen ? "max-h-96 pb-4" : "max-h-0"
				}`}
			>
				<p className="text-gray-300">{answer}</p>
			</div>
		</div>
	);
}

function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
	return (
		<div className="relative">
			{/* Desktop: Horizontal timeline */}
			<div className="hidden md:block">
				{/* Connecting line */}
				<div className="absolute top-8 left-0 right-0 h-0.5 bg-blue-700" />
				<div className="flex justify-between relative">
					{steps.map((step, index) => {
						const Icon = iconMap[step.icon] || CheckCircle;
						return (
							<div key={step.title} className="flex flex-col items-center text-center w-28">
								<div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-3 relative z-10 shadow-lg shadow-blue-500/30">
									<Icon className="w-7 h-7 text-white" />
								</div>
								<h4 className="font-semibold text-white mb-1">{step.title}</h4>
								<p className="text-xs text-gray-400">{step.description}</p>
								{index < steps.length - 1 && (
									<div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5" />
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Mobile: Vertical timeline */}
			<div className="md:hidden space-y-4">
				{steps.map((step, index) => {
					const Icon = iconMap[step.icon] || CheckCircle;
					return (
						<div key={step.title} className="flex items-start gap-4">
							<div className="relative">
								<div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
									<Icon className="w-5 h-5 text-white" />
								</div>
								{index < steps.length - 1 && (
									<div className="absolute top-12 left-1/2 w-0.5 h-8 bg-blue-700 -translate-x-1/2" />
								)}
							</div>
							<div className="pt-2">
								<h4 className="font-semibold text-white">{step.title}</h4>
								<p className="text-sm text-gray-400">{step.description}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function FAQ() {
	const { t, i18n } = useTranslation();
	const isKorean = i18n.language === "ko";
	const sections = t("faq.sections", { returnObjects: true }) as FAQSection[];
	const processSteps = t("faq.process.steps", { returnObjects: true }) as ProcessStep[];

	return (
		<main className="py-20 bg-gray-900">
			<SEO
				title={isKorean ? "자주 묻는 질문" : "FAQ"}
				description={isKorean
					? "PixelFlow 웹 개발 서비스에 대해 자주 묻는 질문과 답변. 프로세스, 가격, 기술 스택 등."
					: "Frequently asked questions about PixelFlow web development services. Process, pricing, tech stack, and more."}
				url="/faq"
			/>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
						{t("faq.title")}
					</h1>
					<p className="text-xl text-gray-300">{t("faq.description")}</p>
				</AnimatedSection>

				{/* Process Timeline */}
				<AnimatedSection className="mb-16" delay={0.1}>
					<h2 className="text-2xl font-semibold mb-8 text-center text-blue-400">
						{t("faq.process.title")}
					</h2>
					<div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
						<ProcessTimeline steps={processSteps} />
					</div>
				</AnimatedSection>

				<StaggerContainer className="space-y-12 max-w-3xl mx-auto">
					{sections.map((section) => (
						<motion.div key={section.title} variants={staggerItemVariants}>
							<h2 className="text-2xl font-semibold mb-6 text-blue-400">
								{section.title}
							</h2>
							<div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
								{section.items.map((item) => (
									<AccordionItem
										key={item.question}
										question={item.question}
										answer={item.answer}
									/>
								))}
							</div>
						</motion.div>
					))}
				</StaggerContainer>

				<AnimatedSection className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 border border-blue-500/30" delay={0.3}>
					<h3 className="text-2xl font-bold text-white mb-4">
						{t("faq.cta.title")}
					</h3>
					<p className="text-blue-100 mb-6">{t("faq.cta.description")}</p>
					<a
						href="/contact"
						className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors"
					>
						{t("faq.cta.button")}
					</a>
				</AnimatedSection>
			</div>
		</main>
	);
}
