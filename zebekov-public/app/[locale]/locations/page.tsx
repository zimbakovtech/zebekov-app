"use client";

import { motion } from "framer-motion";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  EnvelopeIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";

export default function LocationsPage() {
  const t = useTranslations();
  const locale = useLocale();

  const locations = [
    {
      id: 1,
      name: t("locations.strumica.name"),
      address: t("locations.strumica.address"),
      phone: t("locations.strumica.phone"),
      email: t("locations.strumica.email"),
      hours: {
        weekdays: t("locations.strumica.hours.weekdays"),
        saturday: t("locations.strumica.hours.saturday"),
        sunday: t("locations.strumica.hours.sunday"),
      },
      parking: t("locations.strumica.parking"),
      image: "../images/strumica.jpg",
      mapsLink: "https://maps.app.goo.gl/gVUN8gUcS8cbR5pM7",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.3690894644756!2d22.643213175851976!3d41.43121239327597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a9fe731aa9aea7%3A0x3e7ed6ab7cadb484!2sDental%20Center%20Zebekov!5e0!3m2!1sen!2smk!4v1750509978910!5m2!1sen!2smk",
    },
    {
      id: 2,
      name: t("locations.novoselo.name"),
      address: t("locations.novoselo.address"),
      phone: t("locations.novoselo.phone"),
      email: t("locations.novoselo.email"),
      hours: {
        weekdays: t("locations.novoselo.hours.weekdays"),
        saturday: t("locations.novoselo.hours.saturday"),
        sunday: t("locations.novoselo.hours.sunday"),
      },
      parking: t("locations.novoselo.parking"),
      image: "../images/strumica.jpg",
      mapsLink: "https://maps.app.goo.gl/jZzECamnvrc3gG7Y8",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.2199248229736!2d22.879523275851067!3d41.412744394422326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a9f142cbd0aa1f%3A0x65a2bd9cf67eccf1!2sDental%20Center%20Zebekov!5e0!3m2!1sen!2smk!4v1750510021430!5m2!1sen!2smk",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="../images/background.jpg "
            alt="Our locations"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            {...({} as any)}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("locations.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                {t("locations.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t("locations.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
            {...({} as any)}
          >
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                {...({} as any)}
              >
                {/* Location Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {location.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-white/90">
                        <MapPinIcon className="h-5 w-5" />
                        <span>{location.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                <div
                  className={`space-y-8 ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      {location.name}
                    </h2>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPinIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {t("locations.address")}
                          </h4>
                          <p className="text-gray-600">{location.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <PhoneIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {t("locations.phone")}
                          </h4>
                          <a
                            href={`tel:${location.phone}`}
                            className="text-[#44B0B6] hover:text-[#3A9BA1] transition-colors"
                          >
                            {location.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <EnvelopeIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {t("locations.email")}
                          </h4>
                          <a
                            href={`mailto:${location.email}`}
                            className="text-[#44B0B6] hover:text-[#3A9BA1] transition-colors"
                          >
                            {location.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <ClockIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {t("locations.hours")}
                          </h4>
                          <div className="text-gray-600 space-y-1">
                            <p>{location.hours.weekdays}</p>
                            <p>{location.hours.saturday}</p>
                            <p>{location.hours.sunday}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <TruckIcon className="h-6 w-6 text-[#44B0B6] mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {t("locations.parking")}
                          </h4>
                          <p className="text-gray-600">{location.parking}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`/${locale}/contact#book-appointment`}
                      className="btn-primary flex items-center justify-center"
                    >
                      {t("locations.bookAppointment")}
                    </a>
                    <a
                      href={location.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center justify-center"
                    >
                      {t("locations.getDirections")}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              {t("locations.findUsOnMap")}{" "}
              <span className="gradient-text">
                {t("locations.findUsOnMapHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("locations.mapSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                {...({} as any)}
              >
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600">{location.address}</p>
                </div>
                <div className="h-64 bg-gray-200">
                  <iframe
                    src={location.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("locations.visitUsToday")}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t("locations.visitDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact#book-appointment`}
                className="btn-primary flex items-center justify-center"
              >
                {t("locations.bookAppointment")}
              </a>
              <a
                href="tel:+38970515734"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-[#44B0B6] transition-all duration-300 inline-block"
              >
                {t("locations.callUsNow")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
