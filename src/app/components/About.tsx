import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];
  const skills = t('about.skills', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">{t('about.title')}</h2>
            <div className="space-y-4 text-lg text-gray-600">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">{t('about.skillsTitle')}</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              <p className="text-lg italic">
                "{t('about.quote')}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
