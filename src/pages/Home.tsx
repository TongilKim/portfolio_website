import { Hero } from "../app/components/Hero";
import { Services } from "../app/components/Services";
import { Portfolio } from "../app/components/Portfolio";
import { About } from "../app/components/About";
import { Contact } from "../app/components/Contact";

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
