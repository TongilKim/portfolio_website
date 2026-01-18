import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
	onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
	const [phase, setPhase] = useState<"loading" | "design" | "morphing" | "done">("loading");

	useEffect(() => {
		// Show loading state briefly
		const loadingTimer = setTimeout(() => setPhase("design"), 300);
		// Show the design clearly before morphing (longer design phase)
		const designTimer = setTimeout(() => setPhase("morphing"), 2000);
		// Complete animation
		const completeTimer = setTimeout(() => {
			setPhase("done");
			onComplete();
		}, 3000);

		return () => {
			clearTimeout(loadingTimer);
			clearTimeout(designTimer);
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
					{/* Background grid pattern */}
					<div className="absolute inset-0 opacity-10">
						<div
							className="w-full h-full"
							style={{
								backgroundImage: `
									linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
									linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
								`,
								backgroundSize: '40px 40px'
							}}
						/>
					</div>

					{/* Figma-like canvas */}
					<div className="relative w-full max-w-2xl mx-4">
						{/* Design frame */}
						<motion.div
							className="relative bg-white rounded-lg shadow-2xl overflow-hidden"
							initial={{ scale: 0.8, opacity: 0, y: 20 }}
							animate={{
								scale: phase === "morphing" ? 1.02 : 1,
								opacity: 1,
								y: 0
							}}
							transition={{ duration: 0.5, ease: "easeOut" }}
						>
							{/* Figma toolbar mockup */}
							<motion.div
								className="bg-gray-800 px-4 py-2.5 flex items-center gap-3"
								animate={{
									opacity: phase === "morphing" ? 0 : 1,
									y: phase === "morphing" ? -30 : 0
								}}
								transition={{ duration: 0.3 }}
							>
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<div className="w-3 h-3 rounded-full bg-yellow-500" />
									<div className="w-3 h-3 rounded-full bg-green-500" />
								</div>
								<div className="flex-1 text-center">
									<span className="text-gray-400 text-sm font-mono">design.fig</span>
								</div>
								<div className="flex gap-2 text-gray-500">
									<div className="w-4 h-4 rounded bg-gray-700" />
									<div className="w-4 h-4 rounded bg-gray-700" />
								</div>
							</motion.div>

							{/* Design content area */}
							<div className="p-8 bg-gray-100 min-h-[280px] relative">
								{/* Wireframe elements */}
								<motion.div
									className="space-y-5"
									animate={{
										filter: phase === "morphing" ? "blur(12px)" : "blur(0px)",
										scale: phase === "morphing" ? 1.1 : 1,
										opacity: phase === "morphing" ? 0.5 : 1
									}}
									transition={{ duration: 0.5 }}
								>
									{/* Header wireframe */}
									<motion.div
										className="flex justify-between items-center"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2, duration: 0.4 }}
									>
										<motion.div
											className="h-7 w-28 bg-blue-500 rounded-md flex items-center justify-center"
											animate={{
												backgroundColor: phase === "design" ? "#3b82f6" : "#2563eb"
											}}
										>
											<span className="text-white text-xs font-bold">LOGO</span>
										</motion.div>
										<div className="flex gap-3">
											{["Home", "About", "Work"].map((item, i) => (
												<motion.div
													key={item}
													className="h-5 px-3 bg-gray-300 rounded flex items-center justify-center"
													initial={{ opacity: 0, y: -10 }}
													animate={{
														opacity: 1,
														y: 0,
														backgroundColor: phase === "morphing" ? "#6b7280" : "#d1d5db"
													}}
													transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
												>
													<span className="text-gray-600 text-[10px]">{item}</span>
												</motion.div>
											))}
										</div>
									</motion.div>

									{/* Hero wireframe */}
									<motion.div
										className="pt-8 space-y-4"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.4, duration: 0.4 }}
									>
										{/* Badge */}
										<motion.div
											className="h-6 w-32 bg-blue-100 rounded-full mx-auto flex items-center justify-center"
											animate={{
												backgroundColor: phase === "morphing" ? "#dbeafe" : "#eff6ff"
											}}
										>
											<span className="text-blue-600 text-[10px] font-medium">✨ Welcome</span>
										</motion.div>

										{/* Title */}
										<motion.div
											className="h-10 w-72 bg-gray-800 rounded mx-auto flex items-center justify-center"
											animate={{
												backgroundColor: phase === "morphing" ? "#1f2937" : "#374151"
											}}
										>
											<span className="text-white text-sm font-bold">Design to Code</span>
										</motion.div>

										{/* Subtitle */}
										<motion.div
											className="h-5 w-56 bg-gray-300 rounded mx-auto flex items-center justify-center"
										>
											<span className="text-gray-500 text-[10px]">Your designs, perfectly built</span>
										</motion.div>

										{/* CTA Buttons */}
										<motion.div
											className="flex gap-4 justify-center pt-6"
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.6, duration: 0.4 }}
										>
											<motion.div
												className="h-11 w-32 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"
												animate={{
													scale: phase === "design" ? [1, 1.02, 1] : 1,
													boxShadow: phase === "design"
														? "0 4px 20px rgba(59, 130, 246, 0.4)"
														: "0 4px 6px rgba(0, 0, 0, 0.1)"
												}}
												transition={{
													scale: { repeat: phase === "design" ? Infinity : 0, duration: 1.5 },
													boxShadow: { duration: 0.3 }
												}}
											>
												<span className="text-white text-xs font-semibold">Get Started</span>
											</motion.div>
											<motion.div
												className="h-11 w-32 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center"
												animate={{
													borderColor: phase === "morphing" ? "#3b82f6" : "#d1d5db"
												}}
											>
												<span className="text-gray-600 text-xs font-semibold">Learn More</span>
											</motion.div>
										</motion.div>
									</motion.div>
								</motion.div>

								{/* Code particles during morph */}
								<AnimatePresence>
									{phase === "morphing" && (
										<motion.div
											className="absolute inset-0 pointer-events-none flex items-center justify-center"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											{/* Code symbols floating */}
											{["</>", "{}", "( )", "=>", "[]", "/**/"].map((symbol, i) => (
												<motion.span
													key={symbol}
													className="absolute text-blue-400 font-mono text-lg font-bold"
													initial={{
														x: 0,
														y: 0,
														opacity: 0,
														scale: 0
													}}
													animate={{
														x: Math.cos(i * (Math.PI / 3)) * 120,
														y: Math.sin(i * (Math.PI / 3)) * 80,
														opacity: [0, 1, 0],
														scale: [0, 1.2, 0],
														rotate: [0, 360]
													}}
													transition={{
														duration: 0.8,
														delay: i * 0.08,
														ease: "easeOut"
													}}
												>
													{symbol}
												</motion.span>
											))}

											{/* Pixel particles */}
											{[...Array(15)].map((_, i) => (
												<motion.div
													key={`pixel-${i}`}
													className="absolute w-2 h-2 bg-blue-500 rounded-sm"
													initial={{
														x: 0,
														y: 0,
														opacity: 0,
														scale: 0
													}}
													animate={{
														x: (Math.random() - 0.5) * 300,
														y: (Math.random() - 0.5) * 200,
														opacity: [0, 0.8, 0],
														scale: [0, 1, 0]
													}}
													transition={{
														duration: 0.6,
														delay: i * 0.04,
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
							className="text-center mt-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.4 }}
						>
							<motion.span
								className="text-blue-400 font-bold text-2xl tracking-wider"
								animate={{
									textShadow: phase === "design"
										? ["0 0 10px rgba(96, 165, 250, 0.5)", "0 0 20px rgba(96, 165, 250, 0.8)", "0 0 10px rgba(96, 165, 250, 0.5)"]
										: "0 0 10px rgba(96, 165, 250, 0.5)"
								}}
								transition={{
									repeat: phase === "design" ? Infinity : 0,
									duration: 1.5
								}}
							>
								PixelFlow
							</motion.span>
							<motion.p
								className="text-gray-500 text-sm mt-2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.7 }}
							>
								Design → Code
							</motion.p>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
