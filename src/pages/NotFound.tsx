import { Home, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SEO } from "@/app/components/SEO";
import { Button } from "@/app/components/ui/button";

export function NotFound() {
	const { t, i18n } = useTranslation();
	const isKorean = i18n.language === "ko";

	return (
		<main className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
			<SEO
				title={isKorean ? "404 - 페이지를 찾을 수 없습니다" : "404 - Page Not Found"}
				description={isKorean
					? "요청하신 페이지를 찾을 수 없습니다. PixelFlow 홈페이지로 돌아가세요."
					: "The page you're looking for doesn't exist. Return to PixelFlow homepage."}
				noindex={true}
			/>

			<div className="text-center max-w-2xl mx-auto">
				{/* 404 Animation */}
				<div className="relative mb-8">
					<div className="text-9xl font-bold text-blue-600/20">404</div>
					<div className="absolute inset-0 flex items-center justify-center">
						<Search className="w-20 h-20 text-blue-500 animate-pulse" />
					</div>
				</div>

				{/* Error Message */}
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
					{isKorean ? "페이지를 찾을 수 없습니다" : "Page Not Found"}
				</h1>

				<p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
					{isKorean
						? "요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."
						: "The page you're looking for doesn't exist or may have been moved."}
				</p>

				{/* Suggestions */}
				<div className="bg-gray-800 rounded-lg p-6 mb-8 text-left max-w-md mx-auto border border-gray-700">
					<h2 className="text-lg font-semibold text-white mb-3">
						{isKorean ? "다음을 시도해보세요:" : "Try the following:"}
					</h2>
					<ul className="space-y-2 text-gray-300">
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							{isKorean
								? "URL이 정확한지 확인해주세요"
								: "Check if the URL is correct"}
						</li>
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							{isKorean
								? "홈페이지에서 원하는 페이지를 찾아보세요"
								: "Navigate from the homepage to find what you need"}
						</li>
						<li className="flex items-start">
							<span className="text-blue-500 mr-2">•</span>
							{isKorean
								? "문의 페이지를 통해 도움을 요청하세요"
								: "Contact us if you need assistance"}
						</li>
					</ul>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link to="/">
						<Button size="lg" className="gap-2">
							<Home className="w-4 h-4" />
							{isKorean ? "홈으로 돌아가기" : "Back to Home"}
						</Button>
					</Link>
					<Link to="/contact">
						<Button size="lg" variant="outline" className="gap-2">
							{isKorean ? "문의하기" : "Contact Us"}
						</Button>
					</Link>
				</div>

				{/* Additional Help */}
				<div className="mt-12 pt-8 border-t border-gray-700">
					<p className="text-sm text-gray-400">
						{isKorean
							? "계속해서 문제가 발생한다면 contact@pixelflow.dev로 문의해주세요."
							: "If the problem persists, please contact us at contact@pixelflow.dev"}
					</p>
				</div>
			</div>
		</main>
	);
}