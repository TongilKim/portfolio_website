import { useTranslation } from "react-i18next";

interface ServiceItem {
  title: string;
  description: string;
}

export function ServicesV2() {
  const { t } = useTranslation();
  const services = t('servicesV2.items', { returnObjects: true }) as ServiceItem[];

  return (
    <section id="services" className="bg-gray-50 border-y">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl mb-16">{t('servicesV2.title')}</h2>

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
