import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
}

const directionVariants = {
	up: { y: 40, opacity: 0 },
	down: { y: -40, opacity: 0 },
	left: { x: 40, opacity: 0 },
	right: { x: -40, opacity: 0 },
	none: { opacity: 0 },
};

export function AnimatedSection({
	children,
	className = "",
	delay = 0,
	direction = "up",
}: AnimatedSectionProps) {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

	return (
		<motion.div
			ref={ref}
			initial={directionVariants[direction]}
			animate={isVisible ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
			transition={{
				duration: 0.6,
				delay,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

interface StaggerContainerProps {
	children: ReactNode;
	className?: string;
	staggerDelay?: number;
}

export function StaggerContainer({
	children,
	className = "",
	staggerDelay = 0.1,
}: StaggerContainerProps) {
	const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isVisible ? "visible" : "hidden"}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: staggerDelay,
					},
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export const staggerItemVariants = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94],
		},
	},
};
