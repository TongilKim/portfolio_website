export function HeroV2() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-8">
            I create websites for your business
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl">
            Clean, functional web design and development. 
            I help businesses establish their online presence.
          </p>

          <button
            onClick={scrollToContact}
            className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors"
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
}
