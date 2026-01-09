import { Header } from "./Header";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { Portfolio } from "./Portfolio";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export function Version1() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
