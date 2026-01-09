import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ContactV2() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-gray-50 border-y">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl mb-8">{t('contactV2.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('contactV2.description')}
            </p>
            <div className="space-y-4 text-gray-600">
              <div>
                <div className="text-sm mb-1">{t('contactV2.info.emailLabel')}</div>
                <div>{t('contactV2.info.email')}</div>
              </div>
              <div>
                <div className="text-sm mb-1">{t('contactV2.info.phoneLabel')}</div>
                <div>{t('contactV2.info.phone')}</div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  {t('contactV2.form.name')}
                </label>
                <Input id="name" className="border-gray-300" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  {t('contactV2.form.email')}
                </label>
                <Input id="email" type="email" className="border-gray-300" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  {t('contactV2.form.message')}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  className="border-gray-300"
                />
              </div>

              <button
                type="submit"
                className="border-2 border-black px-8 py-3 hover:bg-black hover:text-white transition-colors w-full md:w-auto"
              >
                {t('contactV2.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
