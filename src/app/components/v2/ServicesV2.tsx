import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServiceItem {
  title: string;
  description: string;
  idealFor: string;
}

export function ServicesV2() {
  const { t } = useTranslation();
  const services = t('servicesV2.items', { returnObjects: true }) as ServiceItem[];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="bg-gray-50 border-y">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl mb-16">{t('servicesV2.title')}</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="group">
              <h3 className="text-xl mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-2">{service.description}</p>
              <p className="text-sm text-gray-500">{service.idealFor}</p>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-16 pt-12 border-t">
          <button
            onClick={scrollToContact}
            className="inline-flex items-center text-lg hover:underline underline-offset-4"
          >
            {t('servicesV2.cta')}
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
