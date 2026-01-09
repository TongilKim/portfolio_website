import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { contactSchemaV2, type ContactFormDataV2 } from "@/lib/validations/contactSchema";

export function ContactV2() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormDataV2>({
    resolver: zodResolver(contactSchemaV2),
    mode: "onBlur",
  });

  const onSubmit = (data: ContactFormDataV2) => {
    // TODO: Handle form submission in Plan 03-02
    console.log("Form data:", data);
  };

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  {t('contactV2.form.name')}
                </label>
                <Input
                  id="name"
                  className="border-gray-300"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {t(errors.name.message as string)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  {t('contactV2.form.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  className="border-gray-300"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {t(errors.email.message as string)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  {t('contactV2.form.message')}
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  className="border-gray-300"
                  {...register("message")}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p className="text-sm text-red-600 mt-1" role="alert">
                    {t(errors.message.message as string)}
                  </p>
                )}
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
