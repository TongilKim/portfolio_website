import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "./AnimatedSection";
import { Card, CardContent } from "./ui/card";

interface Testimonial {
	id: number;
	nameKey: string;
	roleKey: string;
	contentKey: string;
	avatar: string;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		nameKey: "testimonials.items.1.name",
		roleKey: "testimonials.items.1.role",
		contentKey: "testimonials.items.1.content",
		avatar: "JK",
	},
	{
		id: 2,
		nameKey: "testimonials.items.2.name",
		roleKey: "testimonials.items.2.role",
		contentKey: "testimonials.items.2.content",
		avatar: "SL",
	},
	{
		id: 3,
		nameKey: "testimonials.items.3.name",
		roleKey: "testimonials.items.3.role",
		contentKey: "testimonials.items.3.content",
		avatar: "MH",
	},
	{
		id: 4,
		nameKey: "testimonials.items.4.name",
		roleKey: "testimonials.items.4.role",
		contentKey: "testimonials.items.4.content",
		avatar: "YC",
	},
];

export function Testimonials() {
	const { t } = useTranslation();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const nextSlide = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % testimonials.length);
	}, []);

	const prevSlide = useCallback(() => {
		setCurrentIndex(
			(prev) => (prev - 1 + testimonials.length) % testimonials.length,
		);
	}, []);

	useEffect(() => {
		if (isPaused) return;

		const interval = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(interval);
	}, [isPaused, nextSlide]);

	return (
		<section id="testimonials" className="py-20 bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<AnimatedSection className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4 text-white">
						{t("testimonials.title")}
					</h2>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("testimonials.description")}
					</p>
				</AnimatedSection>

				<div
					className="relative"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					<div className="overflow-hidden">
						<div
							className="flex transition-transform duration-500 ease-out"
							style={{ transform: `translateX(-${currentIndex * 100}%)` }}
						>
							{testimonials.map((testimonial) => (
								<div
									key={testimonial.id}
									className="w-full flex-shrink-0 px-4"
								>
									<AnimatedSection>
										<Card className="bg-gray-800 border-gray-700 max-w-3xl mx-auto">
											<CardContent className="p-8 md:p-12">
												<Quote className="w-12 h-12 text-blue-500 mb-6 opacity-50" />
												<p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
													{t(testimonial.contentKey)}
												</p>
												<div className="flex items-center gap-4">
													<div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
														{testimonial.avatar}
													</div>
													<div>
														<p className="font-semibold text-white">
															{t(testimonial.nameKey)}
														</p>
														<p className="text-gray-400 text-sm">
															{t(testimonial.roleKey)}
														</p>
													</div>
												</div>
											</CardContent>
										</Card>
									</AnimatedSection>
								</div>
							))}
						</div>
					</div>

					<button
						type="button"
						onClick={prevSlide}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors shadow-lg"
						aria-label={t("testimonials.previous")}
					>
						<ChevronLeft size={24} />
					</button>
					<button
						type="button"
						onClick={nextSlide}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors shadow-lg"
						aria-label={t("testimonials.next")}
					>
						<ChevronRight size={24} />
					</button>

					<div className="flex justify-center gap-2 mt-8">
						{testimonials.map((_, index) => (
							<button
								key={testimonials[index].id}
								type="button"
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full transition-colors ${
									index === currentIndex
										? "bg-blue-500"
										: "bg-gray-600 hover:bg-gray-500"
								}`}
								aria-label={`${t("testimonials.goTo")} ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
