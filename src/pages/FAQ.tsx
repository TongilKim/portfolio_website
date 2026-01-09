import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

function AccordionItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 flex justify-between items-center text-left hover:text-blue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const { t } = useTranslation();
  const sections = t("faq.sections", { returnObjects: true }) as FAQSection[];

  return (
    <main className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("faq.title")}
          </h1>
          <p className="text-xl text-gray-600">{t("faq.description")}</p>
        </div>

        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-semibold mb-6 text-blue-600">
                {section.title}
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                {section.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t("faq.cta.title")}
          </h3>
          <p className="text-blue-100 mb-6">{t("faq.cta.description")}</p>
          <a
            href="/#contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            {t("faq.cta.button")}
          </a>
        </div>
      </div>
    </main>
  );
}
