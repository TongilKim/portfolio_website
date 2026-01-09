import { Palette, Code, Smartphone, ShoppingCart, Search, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const services = [
  {
    icon: Code,
    title: "Custom Website Development",
    description: "Fully responsive, custom-coded websites tailored to your unique needs and brand identity."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that engage users and create memorable experiences."
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description: "Complete online store development with secure payment integration and inventory management."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Websites optimized for all devices, ensuring perfect performance on mobile, tablet, and desktop."
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Search engine optimized websites that help you rank higher and attract more customers."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast loading times and optimal performance for better user experience and conversions."
  }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">Services I Offer</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive web development solutions to help your business succeed online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-blue-600" size={24} />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
