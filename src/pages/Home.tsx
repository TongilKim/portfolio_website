import { About } from "../app/components/About";
import { Contact } from "../app/components/Contact";
import { Hero } from "../app/components/Hero";
import { Portfolio } from "../app/components/Portfolio";
import { Services } from "../app/components/Services";

export function Home() {
	return (
		<>
			<Hero />
			<Services />
			<Portfolio />
			<About />
			<Contact />
		</>
	);
}
