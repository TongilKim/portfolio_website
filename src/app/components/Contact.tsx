import { useForm as useFormspree } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckCircle2,
	Loader2,
	Send,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FORMSPREE_FORM_ID } from "@/config/formspree";
import {
	type ContactFormData,
	contactSchema,
} from "@/lib/validations/contactSchema";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function Contact() {
	const { t, i18n } = useTranslation();
	const isKorean = i18n.language.startsWith("ko");

	// Track form values for button disable state
	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		projectType: "",
		message: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		mode: "onBlur",
		defaultValues: {
			name: "",
			email: "",
			projectType: "",
			message: "",
		},
	});

	const isFormFilled =
		formValues.name.length >= 2 &&
		formValues.email.length > 0 &&
		formValues.email.includes("@") &&
		formValues.projectType.length >= 1 &&
		formValues.message.length >= 10;

	const handleInputChange =
		(field: keyof typeof formValues) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormValues((prev: typeof formValues) => ({
				...prev,
				[field]: e.target.value,
			}));
		};

	const [formspreeState, submitToFormspree] = useFormspree(FORMSPREE_FORM_ID);

	const onSubmit = async (data: ContactFormData) => {
		await submitToFormspree(data);
		if (formspreeState.succeeded) {
			reset();
		}
	};

	return (
		<section id="contact" className="py-20 bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4 text-white">{t("contact.title")}</h2>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						{t("contact.description")}
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold mb-6 text-white">
								{t("contact.getInTouch.title")}
							</h3>
							<p className="text-gray-300 mb-8">
								{t("contact.getInTouch.description")}
							</p>
						</div>

						{isKorean && (
							<div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
								<h4 className="font-semibold mb-3 text-white">{t("kakao.title")}</h4>
								<p className="text-gray-400 text-sm mb-4">
									{t("kakao.description")}
								</p>
								<a
									href="https://open.kakao.com/o/sL7Kr6bi"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105"
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.89 5.31 4.73 6.72-.15.54-.81 2.93-.84 3.13 0 0-.02.13.05.19.07.05.16.03.16.03.21-.03 2.43-1.57 3.44-2.23.78.12 1.6.18 2.46.18 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
									</svg>
									{t("kakao.chatButton")}
								</a>
							</div>
						)}
					</div>

					<Card className="bg-gray-900 border-gray-700">
						<CardContent className="p-6">
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-2 text-gray-200"
									>
										{t("contact.form.name")}
									</label>
									<Input
										id="name"
										placeholder={t("contact.form.namePlaceholder")}
										{...register("name", {
											onChange: handleInputChange("name"),
										})}
										aria-invalid={errors.name ? "true" : "false"}
									/>
									{errors.name && (
										<p className="text-sm text-red-600 mt-1" role="alert">
											{t(errors.name.message as string)}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium mb-2 text-gray-200"
									>
										{t("contact.form.email")}
									</label>
									<Input
										id="email"
										type="email"
										placeholder={t("contact.form.emailPlaceholder")}
										{...register("email", {
											onChange: handleInputChange("email"),
										})}
										aria-invalid={errors.email ? "true" : "false"}
									/>
									{errors.email && (
										<p className="text-sm text-red-600 mt-1" role="alert">
											{t(errors.email.message as string)}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="projectType"
										className="block text-sm font-medium mb-2 text-gray-200"
									>
										{t("contact.form.project")}
									</label>
									<Input
										id="projectType"
										placeholder={t("contact.form.projectPlaceholder")}
										{...register("projectType", {
											onChange: handleInputChange("projectType"),
										})}
										aria-invalid={errors.projectType ? "true" : "false"}
									/>
									{errors.projectType && (
										<p className="text-sm text-red-600 mt-1" role="alert">
											{t(errors.projectType.message as string)}
										</p>
									)}
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium mb-2 text-gray-200"
									>
										{t("contact.form.message")}
									</label>
									<Textarea
										id="message"
										placeholder={t("contact.form.messagePlaceholder")}
										rows={5}
										{...register("message", {
											onChange: handleInputChange("message"),
										})}
										aria-invalid={errors.message ? "true" : "false"}
									/>
									{errors.message && (
										<p className="text-sm text-red-600 mt-1" role="alert">
											{t(errors.message.message as string)}
										</p>
									)}
								</div>

								<Button
									type="submit"
									className="w-full gap-2"
									disabled={!isFormFilled || formspreeState.submitting}
								>
									{formspreeState.submitting ? (
										<>
											<Loader2 size={16} className="animate-spin" />
											{t("contact.form.sending")}
										</>
									) : (
										<>
											{t("contact.form.submit")}
											<Send size={16} />
										</>
									)}
								</Button>

								{formspreeState.succeeded && (
									<div className="flex items-center gap-2 p-4 bg-green-900/30 border border-green-700 rounded-lg">
										<CheckCircle2 className="text-green-400" size={20} />
										<p className="text-sm text-green-300">
											{t("contact.form.success")}
										</p>
									</div>
								)}

								{formspreeState.errors && (
									<div className="flex items-center gap-2 p-4 bg-red-900/30 border border-red-700 rounded-lg">
										<XCircle className="text-red-400" size={20} />
										<p className="text-sm text-red-300">
											{t("contact.form.error")}
										</p>
									</div>
								)}
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
