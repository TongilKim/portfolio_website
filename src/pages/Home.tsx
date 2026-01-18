import { useState } from "react";
import { About } from "../app/components/About";
import { Contact } from "../app/components/Contact";
import { Hero } from "../app/components/Hero";
import { IntroAnimation } from "../app/components/IntroAnimation";
import { Portfolio } from "../app/components/Portfolio";
import { Services } from "../app/components/Services";

export function Home() {
	const [showIntro, setShowIntro] = useState(true);

	return (
		<>
			{showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
			<Hero />
			<Services />
			<Portfolio />
			<About />
			<Contact />
		</>
	);
}
