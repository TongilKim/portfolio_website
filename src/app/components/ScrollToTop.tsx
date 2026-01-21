import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		// If there's a hash, scroll to that element instead of top
		if (hash) {
			// Small delay to ensure the page content is rendered
			setTimeout(() => {
				const element = document.getElementById(hash.slice(1));
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}, 100);
		} else {
			window.scrollTo(0, 0);
		}
	}, [pathname, hash]);

	return null;
}
