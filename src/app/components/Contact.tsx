import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { contactSchema, type ContactFormData } from "@/lib/validations/contactSchema";

export function Contact() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: ContactFormData) => {
    // TODO: Handle form submission in Plan 03-02
    console.log("Form data:", data);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t('contact.title')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('contact.getInTouch.title')}</h3>
              <p className="text-gray-600 mb-8">
                {t('contact.getInTouch.description')}
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">{t('contact.info.emailLabel')}</div>
                    <div className="text-gray-600">{t('contact.info.email')}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">{t('contact.info.phoneLabel')}</div>
                    <div className="text-gray-600">{t('contact.info.phone')}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold">{t('contact.info.locationLabel')}</div>
                    <div className="text-gray-600">{t('contact.info.location')}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('contact.form.namePlaceholder')}
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
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
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
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                    {t('contact.form.project')}
                  </label>
                  <Input
                    id="projectType"
                    placeholder={t('contact.form.projectPlaceholder')}
                    {...register("projectType")}
                    aria-invalid={errors.projectType ? "true" : "false"}
                  />
                  {errors.projectType && (
                    <p className="text-sm text-red-600 mt-1" role="alert">
                      {t(errors.projectType.message as string)}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 mt-1" role="alert">
                      {t(errors.message.message as string)}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full gap-2">
                  {t('contact.form.submit')}
                  <Send size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
