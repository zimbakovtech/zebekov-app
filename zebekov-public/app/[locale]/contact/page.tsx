"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: t("contact.contactMethods.phone.title"),
      details: [
        {
          label: t("contact.contactMethods.phone.strumica"),
          value: "+389 70 515 734",
          href: "tel:+38970515734",
        },
        {
          label: t("contact.contactMethods.phone.novoselo"),
          value: "+389 71 393 199",
          href: "tel:+38971393199",
        },
      ],
    },
    {
      icon: EnvelopeIcon,
      title: t("contact.contactMethods.email.title"),
      details: [
        {
          label: t("contact.contactMethods.email.general"),
          value: "contact@zebekov.mk",
          href: "mailto:contact@zebekov.mk",
        },
      ],
    },
    {
      icon: MapPinIcon,
      title: t("contact.contactMethods.locations.title"),
      details: [
        {
          label: t("contact.contactMethods.locations.strumica"),
          value: "Kiro Abrashev 32, 2400 Strumica",
          href: "https://www.google.com/maps/dir//Dental+Center+Zebekov+Kiro+Abrashev+32+Strumica+2400/@41.4312084,22.6457881,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x14a9fe731aa9aea7:0x3e7ed6ab7cadb484",
        },
        {
          label: t("contact.contactMethods.locations.novoselo"),
          value: "Marshal Tito 47, 2437 Novo Selo",
          href: "https://www.google.com/maps/dir//Dental+Center+Zebekov+%D0%9C%D0%B0%D1%80%D1%88%D0%B0%D0%BB+%D0%A2%D0%B8%D1%82%D0%BE+42+Novo+Selo+2434/@41.4127404,22.8820982,16z/data=!4m8!4m7!1m0!1m5!1m1!1s0x14a9f142cbd0aa1f:0x65a2bd9cf67eccf1!2m2!1d22.8820982!2d41.4127404?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D",
        },
      ],
    },
  ];

  const workingHours = [
    {
      day: t("contact.workingHours.mondayFriday"),
      hours: "8:00 - 20:00",
    },
    {
      day: t("contact.workingHours.saturday"),
      hours: "9:00 - 17:00",
    },
    {
      day: t("contact.workingHours.sunday"),
      hours: t("contact.workingHours.closed"),
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // try {
    //   const response = await fetch("/api/send-email", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       name: formData.name,
    //       email: formData.email,
    //       phone: formData.phone,
    //       service: formData.service,
    //       location: formData.location,
    //       message: formData.message,
    //     }),
    //   });

    //   if (response.ok) {
    //     setIsSubmitted(true);
    //     setFormData({
    //       name: "",
    //       email: "",
    //       phone: "",
    //       service: "",
    //       location: "",
    //       message: "",
    //     });
    //     setTimeout(() => setIsSubmitted(false), 3000);
    //   } else {
    //     // Optionally handle error
    //     alert("Failed to send email. Please try again.");
    //   }
    // } catch (error) {
    //   alert("An error occurred. Please try again.");
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="../images/background.jpg"
            alt={t("contact.title")}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-gray-50" id="book-appointment">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
              {...({} as any)}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("contact.bookYourAppointment")}{" "}
                <span className="gradient-text">
                  {t("contact.bookYourAppointmentHighlight")}
                </span>
              </h2>
              <p className="text-gray-600 mb-8">
                {t("contact.formDescription")}
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                  {...({} as any)}
                >
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t("contact.thankYou")}
                  </h3>
                  <p className="text-gray-600">
                    {t("contact.thankYouMessage")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.fullName")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                        placeholder={t("contact.form.fullNamePlaceholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.email")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.phone")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                        placeholder={t("contact.form.phonePlaceholder")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {t("contact.form.preferredLocation")}
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                      >
                        <option value="">
                          {t("contact.form.selectLocation")}
                        </option>
                        <option value="strumica">
                          {t("contact.form.strumicaCenter")}
                        </option>
                        <option value="novoselo">
                          {t("contact.form.novoseloBranch")}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.serviceNeeded")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">
                        {t("contact.form.selectService")}
                      </option>
                      <option value="general">
                        {t("contact.form.generalDentistry")}
                      </option>
                      <option value="cosmetic">
                        {t("contact.form.cosmeticDentistry")}
                      </option>
                      <option value="orthodontics">
                        {t("contact.form.orthodontics")}
                      </option>
                      <option value="surgery">
                        {t("contact.form.oralSurgery")}
                      </option>
                      <option value="pediatric">
                        {t("contact.form.pediatricDentistry")}
                      </option>
                      <option value="emergency">
                        {t("contact.form.emergencyCare")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#44B0B6] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder={t("contact.form.messagePlaceholder")}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t("contact.form.sending")}</span>
                      </div>
                    ) : (
                      t("contact.form.sendMessage")
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
              {...({} as any)}
            >
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-xl p-3">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {info.title}
                        </h3>
                        <div className="space-y-2">
                          {info.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-gray-500">
                                {detail.label}:
                              </span>
                              <a
                                href={detail.href}
                                className="text-[#44B0B6] hover:text-[#3A9BA1] transition-colors font-medium"
                              >
                                {detail.value}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-xl p-3">
                    <ClockIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {t("contact.workingHours.title")}
                    </h3>
                    <div className="space-y-2">
                      {workingHours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-gray-700">{schedule.day}</span>
                          <span className="text-[#44B0B6] font-medium">
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            {...({} as any)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contact.visitOurLocations")}{" "}
              <span className="gradient-text">
                {t("contact.visitOurLocationsHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("contact.visitDescription")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              {...({} as any)}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("contact.form.strumicaCenter")}
                </h3>
                <p className="text-gray-600">
                  Kiro Abrashev 32, Strumica, 2400
                </p>
              </div>
              <div className="h-64 bg-gray-200 w-full overflow-hidden rounded-b-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.3690894644756!2d22.643213175851976!3d41.43121239327597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a9fe731aa9aea7%3A0x3e7ed6ab7cadb484!2sDental%20Center%20Zebekov!5e0!3m2!1sen!2smk!4v1750509978910!5m2!1sen!2smk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              {...({} as any)}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("contact.form.novoseloBranch")}
                </h3>
                <p className="text-gray-600">
                  Marshal Tito 42, Novo Selo, 2437
                </p>
              </div>
              <div className="h-64 bg-gray-200 w-full overflow-hidden rounded-b-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.2199248229736!2d22.879523275851067!3d41.412744394422326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a9f142cbd0aa1f%3A0x65a2bd9cf67eccf1!2sDental%20Center%20Zebekov!5e0!3m2!1sen!2smk!4v1750510021430!5m2!1sen!2smk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
