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

export default function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="min-h-screen">
				<Header />
				<ViewportFadeOverlay />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/process" element={<Process />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
				<KakaoChatFloatingButton />
			</div>
		</BrowserRouter>
	);
}
