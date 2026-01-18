import { useState, useEffect } from "react";

/**
 * ViewportFadeOverlay - Fixed gradient overlays at top and bottom of viewport
 * that create a fade effect for content scrolling through those areas.
 * Bottom overlay hides when scrolled to the bottom of the page.
 */
export function ViewportFadeOverlay() {
	const [isAtBottom, setIsAtBottom] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			// Consider "at bottom" when within 50px of the bottom
			const atBottom = scrollTop + windowHeight >= documentHeight - 50;
			setIsAtBottom(atBottom);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll(); // Check initial position

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{/* Top fade overlay */}
			<div
				className="fixed top-0 left-0 right-0 h-48 pointer-events-none z-40"
				style={{
					background: "linear-gradient(to bottom, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 100%)",
				}}
			/>
			{/* Bottom fade overlay - hidden when at bottom of page */}
			<div
				className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none z-40 transition-opacity duration-300"
				style={{
					background: "linear-gradient(to top, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 100%)",
					opacity: isAtBottom ? 0 : 1,
				}}
			/>
		</>
	);
}
