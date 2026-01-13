import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "../pages/About";
import { ContactPage } from "../pages/Contact";
import { FAQ } from "../pages/FAQ";
import { Home } from "../pages/Home";
import { Process } from "../pages/Process";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className="min-h-screen">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/faq" element={<FAQ />} />
					<Route path="/process" element={<Process />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contact" element={<ContactPage />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
