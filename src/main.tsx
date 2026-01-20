import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./i18n";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<Suspense fallback="Loading...">
			<App />
		</Suspense>
	</HelmetProvider>,
);
