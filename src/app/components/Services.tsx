import { Palette, Code, Smartphone, ShoppingCart, Search, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const iconMap = [Code, Palette, ShoppingCart, Smartphone, Search, Zap];

interface ServiceItem {
  title: string;
  description: string;
}

export function Services() {
  const { t } = useTranslation();
  const services = t('services.items', { returnObjects: true }) as ServiceItem[];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[index] || Code;
            return (
              <Card key={index} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
