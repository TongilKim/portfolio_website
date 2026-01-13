import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/button";

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { t } = useTranslation();
	const location = useLocation();
	const isHomePage = location.pathname === "/";

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
		<header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<div className="text-2xl font-bold text-blue-600">
						{t("app.title")}
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex gap-8">
						<button
							type="button"
							onClick={() => scrollToSection("home")}
							className={`cursor-pointer transition-colors ${isHomePage ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.home")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("services")}
							className="cursor-pointer hover:text-blue-600 transition-colors"
						>
							{t("nav.services")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("portfolio")}
							className="cursor-pointer hover:text-blue-600 transition-colors"
						>
							{t("nav.portfolio")}
						</button>
						<Link
							to="/about"
							className={`cursor-pointer transition-colors ${location.pathname === "/about" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.about")}
						</Link>
						<Link
							to="/faq"
							className={`cursor-pointer transition-colors ${location.pathname === "/faq" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.faq")}
						</Link>
						<Link
							to="/process"
							className={`cursor-pointer transition-colors ${location.pathname === "/process" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.process")}
						</Link>
						<Link
							to="/contact"
							className={`cursor-pointer transition-colors ${location.pathname === "/contact" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.contact")}
						</Link>
					</nav>

					<div className="hidden md:flex items-center gap-4">
						<LanguageSwitcher />
						<Link to="/contact">
							<Button type="button">{t("nav.getStarted")}</Button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden cursor-pointer"
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
							onClick={() => scrollToSection("home")}
							className={`text-left cursor-pointer transition-colors ${isHomePage ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.home")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("services")}
							className="text-left cursor-pointer hover:text-blue-600 transition-colors"
						>
							{t("nav.services")}
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("portfolio")}
							className="text-left cursor-pointer hover:text-blue-600 transition-colors"
						>
							{t("nav.portfolio")}
						</button>
						<Link
							to="/about"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/about" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.about")}
						</Link>
						<Link
							to="/faq"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/faq" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.faq")}
						</Link>
						<Link
							to="/process"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/process" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.process")}
						</Link>
						<Link
							to="/contact"
							onClick={() => setIsMenuOpen(false)}
							className={`text-left cursor-pointer transition-colors ${location.pathname === "/contact" ? "text-blue-600 font-medium" : "hover:text-blue-600"}`}
						>
							{t("nav.contact")}
						</Link>
						<div className="pt-2 border-t">
							<LanguageSwitcher />
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
