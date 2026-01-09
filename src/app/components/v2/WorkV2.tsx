import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const projectImages = [
  "https://images.unsplash.com/photo-1710799885122-428e63eff691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY3ODgyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1742454582165-deab666a8763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlLWNvbW1lcmNlJTIwd2Vic2l0ZXxlbnwxfHx8fDE3Njc5MzQyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY3OTEyNDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

interface ProjectItem {
  title: string;
  type: string;
}

export function WorkV2() {
  const { t } = useTranslation();
  const projects = t('workV2.projects', { returnObjects: true }) as ProjectItem[];

  return (
    <section id="work" className="bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <h2 className="text-3xl md:text-4xl mb-16">{t('workV2.title')}</h2>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="border-b pb-16 last:border-b-0">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.type}</p>
                </div>
                <div>
                  <ImageWithFallback
                    src={projectImages[index]}
                    alt={project.title}
                    className="w-full h-auto border"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
