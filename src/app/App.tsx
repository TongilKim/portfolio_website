import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "../pages/About";
import { ContactPage } from "../pages/Contact";
import { FAQ } from "../pages/FAQ";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { Process } from "../pages/Process";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { KakaoChatFloatingButton } from "./components/KakaoChatButton";
import { ScrollToTop } from "./components/ScrollToTop";
import { ViewportFadeOverlay } from "./components/ViewportFadeOverlay";

const INTRO_SHOWN_KEY = "pixelflow_intro_shown";

export default function App() {
	const [showIntro, setShowIntro] = useState(() => {
		// Only show intro if it hasn't been shown in this session
		return !sessionStorage.getItem(INTRO_SHOWN_KEY);
	});

	const skipIntro = () => {
		sessionStorage.setItem(INTRO_SHOWN_KEY, "true");
		setShowIntro(false);
	};

	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="min-h-screen overflow-x-hidden">
				<Header onLogoClick={skipIntro} />
				<ViewportFadeOverlay />
				<Routes>
					<Route path="/" element={<Home showIntro={showIntro} onIntroComplete={skipIntro} />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/process" element={<Process />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
				{!showIntro && <KakaoChatFloatingButton />}
			</div>
		</BrowserRouter>
	);
}
