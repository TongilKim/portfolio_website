import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
	onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
	const [phase, setPhase] = useState<"design" | "morphing" | "done">("design");

	useEffect(() => {
		// Start morphing after showing the design
		const morphTimer = setTimeout(() => setPhase("morphing"), 800);
		// Complete animation
		const completeTimer = setTimeout(() => {
			setPhase("done");
			onComplete();
		}, 2200);

		return () => {
			clearTimeout(morphTimer);
			clearTimeout(completeTimer);
		};
	}, [onComplete]);

	return (
		<AnimatePresence>
			{phase !== "done" && (
				<motion.div
					className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center overflow-hidden"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
				>
					{/* Figma-like canvas */}
					<div className="relative w-full max-w-2xl mx-4">
						{/* Design frame */}
						<motion.div
							className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{
								scale: phase === "morphing" ? 1.02 : 1,
								opacity: 1
							}}
							transition={{ duration: 0.3 }}
						>
							{/* Figma toolbar mockup */}
							<motion.div
								className="bg-gray-800 px-4 py-2 flex items-center gap-2"
								animate={{
									opacity: phase === "morphing" ? 0 : 1,
									y: phase === "morphing" ? -20 : 0
								}}
								transition={{ duration: 0.3 }}
							>
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<div className="w-3 h-3 rounded-full bg-green-500" />
								</div>
								<div className="flex-1 text-center">
									<span className="text-gray-400 text-xs font-mono">design.fig</span>
								</div>
							</motion.div>

							{/* Design content area */}
							<div className="p-6 bg-gray-100 min-h-[200px] relative">
								{/* Wireframe elements */}
								<motion.div
									className="space-y-4"
									animate={{
										filter: phase === "morphing" ? "blur(8px)" : "blur(0px)",
										scale: phase === "morphing" ? 1.05 : 1,
									}}
									transition={{ duration: 0.4 }}
								>
									{/* Header wireframe */}
									<div className="flex justify-between items-center">
										<motion.div
											className="h-6 w-24 bg-gray-300 rounded"
											animate={{
												backgroundColor: phase === "morphing" ? "#3b82f6" : "#d1d5db"
											}}
											transition={{ duration: 0.3, delay: 0.1 }}
										/>
										<div className="flex gap-2">
											{[1, 2, 3].map((i) => (
												<motion.div
													key={i}
													className="h-4 w-12 bg-gray-300 rounded"
													animate={{
														backgroundColor: phase === "morphing" ? "#6b7280" : "#d1d5db"
													}}
													transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
												/>
											))}
										</div>
									</div>

									{/* Hero wireframe */}
									<div className="pt-6 space-y-3">
										<motion.div
											className="h-4 w-20 bg-blue-200 rounded mx-auto"
											animate={{
												width: phase === "morphing" ? 100 : 80,
												backgroundColor: phase === "morphing" ? "#3b82f6" : "#bfdbfe"
											}}
											transition={{ duration: 0.3, delay: 0.15 }}
										/>
										<motion.div
											className="h-8 w-64 bg-gray-300 rounded mx-auto"
											animate={{
												backgroundColor: phase === "morphing" ? "#1f2937" : "#d1d5db"
											}}
											transition={{ duration: 0.3, delay: 0.2 }}
										/>
										<motion.div
											className="h-4 w-48 bg-gray-200 rounded mx-auto"
											animate={{
												backgroundColor: phase === "morphing" ? "#6b7280" : "#e5e7eb"
											}}
											transition={{ duration: 0.3, delay: 0.25 }}
										/>
										<div className="flex gap-3 justify-center pt-4">
											<motion.div
												className="h-10 w-28 bg-blue-400 rounded-lg"
												animate={{
													backgroundColor: phase === "morphing" ? "#2563eb" : "#60a5fa",
													scale: phase === "morphing" ? 1.05 : 1
												}}
												transition={{ duration: 0.3, delay: 0.3 }}
											/>
											<motion.div
												className="h-10 w-28 bg-gray-300 rounded-lg border-2 border-gray-400"
												animate={{
													borderColor: phase === "morphing" ? "#3b82f6" : "#9ca3af"
												}}
												transition={{ duration: 0.3, delay: 0.35 }}
											/>
										</div>
									</div>
								</motion.div>

								{/* Pixel/code particles overlay during morph */}
								<AnimatePresence>
									{phase === "morphing" && (
										<motion.div
											className="absolute inset-0 pointer-events-none"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											{[...Array(20)].map((_, i) => (
												<motion.div
													key={i}
													className="absolute w-1 h-1 bg-blue-500 rounded-full"
													initial={{
														x: Math.random() * 400 - 200,
														y: Math.random() * 200,
														opacity: 0,
														scale: 0
													}}
													animate={{
														x: Math.random() * 400 - 200,
														y: Math.random() * 200 - 50,
														opacity: [0, 1, 0],
														scale: [0, 1.5, 0]
													}}
													transition={{
														duration: 0.8,
														delay: i * 0.03,
														ease: "easeOut"
													}}
												/>
											))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>

						{/* PixelFlow branding */}
						<motion.div
							className="text-center mt-6"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
						>
							<span className="text-blue-400 font-bold text-xl tracking-wide">
								PixelFlow
							</span>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
