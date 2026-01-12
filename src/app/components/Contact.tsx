import { useForm as useFormspree } from "@formspree/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CheckCircle2,
	Loader2,
	Mail,
	MapPin,
	Phone,
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
	const { t } = useTranslation();

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
		<section id="contact" className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl mb-4">{t("contact.title")}</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						{t("contact.description")}
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12">
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold mb-6">
								{t("contact.getInTouch.title")}
							</h3>
							<p className="text-gray-600 mb-8">
								{t("contact.getInTouch.description")}
							</p>
						</div>

						<div className="space-y-4">
							<Card>
								<CardContent className="flex items-center gap-4 p-4">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
										<Mail className="text-blue-600" size={24} />
									</div>
									<div>
										<div className="font-semibold">
											{t("contact.info.emailLabel")}
										</div>
										<div className="text-gray-600">
											{t("contact.info.email")}
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="flex items-center gap-4 p-4">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
										<Phone className="text-blue-600" size={24} />
									</div>
									<div>
										<div className="font-semibold">
											{t("contact.info.phoneLabel")}
										</div>
										<div className="text-gray-600">
											{t("contact.info.phone")}
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="flex items-center gap-4 p-4">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
										<MapPin className="text-blue-600" size={24} />
									</div>
									<div>
										<div className="font-semibold">
											{t("contact.info.locationLabel")}
										</div>
										<div className="text-gray-600">
											{t("contact.info.location")}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					<Card>
						<CardContent className="p-6">
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium mb-2"
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
										className="block text-sm font-medium mb-2"
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
										className="block text-sm font-medium mb-2"
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
										className="block text-sm font-medium mb-2"
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
									<div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
										<CheckCircle2 className="text-green-600" size={20} />
										<p className="text-sm text-green-800">
											{t("contact.form.success")}
										</p>
									</div>
								)}

								{formspreeState.errors && (
									<div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
										<XCircle className="text-red-600" size={20} />
										<p className="text-sm text-red-800">
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
