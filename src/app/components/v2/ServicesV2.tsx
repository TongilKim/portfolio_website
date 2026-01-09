const services = [
  {
    title: "Web Development",
    description: "Custom websites built with modern technologies. Responsive and performant."
  },
  {
    title: "Design",
    description: "Clean, user-focused design that serves your business goals."
  },
  {
    title: "E-Commerce",
    description: "Online stores with payment integration and product management."
  },
  {
    title: "Maintenance",
    description: "Ongoing support and updates to keep your site running smoothly."
  }
];

export function ServicesV2() {
  return (
    <section id="services" className="bg-gray-50 border-y">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl mb-16">What I do</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index}>
              <h3 className="text-xl mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
