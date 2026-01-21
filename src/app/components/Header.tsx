import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LanguageSelector, InlineLanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";

interface HeaderProps {
	onLogoClick?: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();
	const isHomePage = location.pathname === "/";

	const handleLogoClick = () => {
		onLogoClick?.();
		if (!isHomePage) {
			navigate("/");
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	useEffect(() => {
		if (!isHomePage) {
			setActiveSection("");
			return;
		}

		const handleScroll = () => {
			const sections = ["home", "services", "portfolio"];
			const headerOffset = 100;

			for (const sectionId of sections.reverse()) {
				const element = document.getElementById(sectionId);
				if (element) {
					const rect = element.getBoundingClientRect();
					if (rect.top <= headerOffset) {
						setActiveSection(sectionId);
						return;
					}
				}
			}
			setActiveSection("home");
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isHomePage]);

	const scrollToSection = (id: string) => {
		if (isHomePage) {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
				setIsMenuOpen(false);
			}
		} else {
			// Navigate to home with hash
			window.location.href = `/#${id}`;
		}
	};

	return (
		<header className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<button
						type="button"
						onClick={handleLogoClick}
						className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
					>
						{t("app.title")}
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex gap-8">
						<button
							type="button"
							onClick={handleLogoClick}
							className={`cursor-pointer transition-colors ${activeSection === "home" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.home")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("services")}
							className={`cursor-pointer transition-colors ${activeSection === "services" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.services")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("portfolio")}
							className={`cursor-pointer transition-colors ${activeSection === "portfolio" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.portfolio")}
						</button>
						<Link
							to="/about"
							className={`cursor-pointer transition-colors ${location.pathname === "/about" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.about")}
						</Link>
						<Link
							to="/faq"
							className={`cursor-pointer transition-colors ${location.pathname === "/faq" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.faq")}
						</Link>
						<Link
							to="/process"
							className={`cursor-pointer transition-colors ${location.pathname === "/process" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.process")}
						</Link>
						<Link
							to="/contact"
							className={`cursor-pointer transition-colors ${location.pathname === "/contact" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.contact")}
						</Link>
					</nav>

					<div className="hidden md:flex items-center gap-4">
						<LanguageSelector />
						<Link to="/contact">
							<Button type="button">{t("nav.getStarted")}</Button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden cursor-pointer text-gray-300"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden pb-4 flex flex-col gap-4">
						<button
							type="button"
							onClick={() => {
								handleLogoClick();
								setIsMenuOpen(false);
							}}
							className={`text-left cursor-pointer transition-colors ${activeSection === "home" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.home")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("services")}
							className={`text-left cursor-pointer transition-colors ${activeSection === "services" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.services")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("portfolio")}
							className={`text-left cursor-pointer transition-colors ${activeSection === "portfolio" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.portfolio")}
						</button>
						<Link
							to="/about"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/about" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.about")}
						</Link>
						<Link
							to="/faq"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/faq" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.faq")}
						</Link>
						<Link
							to="/process"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/process" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.process")}
						</Link>
						<Link
							to="/contact"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/contact" ? "text-blue-400 font-medium" : "text-gray-300 hover:text-blue-400"}`}
						>
							{t("nav.contact")}
						</Link>
						<div className="pt-2 border-t border-gray-700">
							<InlineLanguageSelector onLanguageChange={() => setIsMenuOpen(false)} />
						</div>
						<Link to="/contact" onClick={() => setIsMenuOpen(false)}>
							<Button type="button" className="w-full">
								{t("nav.getStarted")}
							</Button>
						</Link>
					</nav>
				)}
			</div>
		</header>
	);
}
