"use client";

import { motion } from "framer-motion";
import {
  UserIcon as DentalMedicineIcon,
  SparklesIcon as AestheticDentistryIcon,
  AdjustmentsHorizontalIcon as OrthodonticsIcon,
  ScissorsIcon as OralSurgeryIcon,
  RectangleStackIcon as ImplantologyIcon,
  PuzzlePieceIcon as ProstheticDentistryIcon,
  PhotoIcon as XRayDiagnosticIcon,
  ShieldCheckIcon,
  HeartIcon,
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();

  const services = [
    {
      id: 1,
      name: t("services.servicesList.dentalMedicine.name"),
      description: t("services.servicesList.dentalMedicine.description"),
      icon: DentalMedicineIcon,
      duration: t("services.servicesList.dentalMedicine.duration"),
      price: t("services.servicesList.dentalMedicine.price"),
      features: [
        t("services.servicesList.dentalMedicine.features.0"),
        t("services.servicesList.dentalMedicine.features.1"),
        t("services.servicesList.dentalMedicine.features.2"),
        t("services.servicesList.dentalMedicine.features.3"),
        t("services.servicesList.dentalMedicine.features.4"),
        t("services.servicesList.dentalMedicine.features.5"),
      ],
      image: "../images/services/stomatoloska_medicina.jpg",
    },
    {
      id: 2,
      name: t("services.servicesList.aestheticDentistry.name"),
      description: t("services.servicesList.aestheticDentistry.description"),
      icon: AestheticDentistryIcon,
      duration: t("services.servicesList.aestheticDentistry.duration"),
      price: t("services.servicesList.aestheticDentistry.price"),
      features: [
        t("services.servicesList.aestheticDentistry.features.0"),
        t("services.servicesList.aestheticDentistry.features.1"),
        t("services.servicesList.aestheticDentistry.features.2"),
        t("services.servicesList.aestheticDentistry.features.3"),
      ],
      image: "../images/services/estetska_stomatologija.jpg",
    },
    {
      id: 3,
      name: t("services.servicesList.orthodontics.name"),
      description: t("services.servicesList.orthodontics.description"),
      icon: OrthodonticsIcon,
      duration: t("services.servicesList.orthodontics.duration"),
      price: t("services.servicesList.orthodontics.price"),
      features: [
        t("services.servicesList.orthodontics.features.0"),
        t("services.servicesList.orthodontics.features.1"),
        t("services.servicesList.orthodontics.features.2"),
        t("services.servicesList.orthodontics.features.3"),
        t("services.servicesList.orthodontics.features.4"),
        t("services.servicesList.orthodontics.features.5"),
        t("services.servicesList.orthodontics.features.6"),
      ],
      image: "../images/services/ortodoncija.jpg",
    },
    {
      id: 4,
      name: t("services.servicesList.oralSurgery.name"),
      description: t("services.servicesList.oralSurgery.description"),
      icon: OralSurgeryIcon,
      duration: t("services.servicesList.oralSurgery.duration"),
      price: t("services.servicesList.oralSurgery.price"),
      features: [
        t("services.servicesList.oralSurgery.features.0"),
        t("services.servicesList.oralSurgery.features.1"),
        t("services.servicesList.oralSurgery.features.2"),
        t("services.servicesList.oralSurgery.features.3"),
      ],
      image: "../images/services/oralna_hirurgija.jpg",
    },
    {
      id: 5,
      name: t("services.servicesList.implantology.name"),
      description: t("services.servicesList.implantology.description"),
      icon: ImplantologyIcon,
      duration: t("services.servicesList.implantology.duration"),
      price: t("services.servicesList.implantology.price"),
      features: [
        t("services.servicesList.implantology.features.0"),
        t("services.servicesList.implantology.features.1"),
        t("services.servicesList.implantology.features.2"),
        t("services.servicesList.implantology.features.3"),
        t("services.servicesList.implantology.features.4"),
      ],
      image: "../images/services/implantologija.jpg",
    },
    {
      id: 6,
      name: t("services.servicesList.prostheticDentistry.name"),
      description: t("services.servicesList.prostheticDentistry.description"),
      icon: ProstheticDentistryIcon,
      duration: t("services.servicesList.prostheticDentistry.duration"),
      price: t("services.servicesList.prostheticDentistry.price"),
      features: [
        t("services.servicesList.prostheticDentistry.features.0"),
        t("services.servicesList.prostheticDentistry.features.1"),
        t("services.servicesList.prostheticDentistry.features.2"),
        t("services.servicesList.prostheticDentistry.features.3"),
        t("services.servicesList.prostheticDentistry.features.4"),
        t("services.servicesList.prostheticDentistry.features.5"),
      ],
      image: "../images/services/protetika.jpg",
    },
    {
      id: 7,
      name: t("services.servicesList.xrayDiagnostics.name"),
      description: t("services.servicesList.xrayDiagnostics.description"),
      icon: XRayDiagnosticIcon,
      duration: t("services.servicesList.xrayDiagnostics.duration"),
      price: t("services.servicesList.xrayDiagnostics.price"),
      features: [
        t("services.servicesList.xrayDiagnostics.features.0"),
        t("services.servicesList.xrayDiagnostics.features.1"),
      ],
      image: "../images/services/rtg.jpg",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
            src="../images/background.jpg"
            alt="Dental services"
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
              {t("services.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                {t("services.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t("services.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            {...({} as any)}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                {...({} as any)}
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <service.icon className="h-6 w-6 text-[#44B0B6]" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {service.duration}
                    </span>
                    <span className="bg-[#44B0B6] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#44B0B6] rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={`/${locale}/contact#book-appointment`}
                    className="w-full block text-center bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {t("header.bookAppointment")}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            {...({} as any)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("services.whyChoose")}{" "}
              <span className="gradient-text">
                {t("services.whyChooseHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("services.whyChooseSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheckIcon,
                title: t("services.features.advancedTechnology.title"),
                description: t(
                  "services.features.advancedTechnology.description"
                ),
              },
              {
                icon: HeartIcon,
                title: t("services.features.personalizedCare.title"),
                description: t(
                  "services.features.personalizedCare.description"
                ),
              },
              {
                icon: UserGroupIcon,
                title: t("services.features.expertTeam.title"),
                description: t("services.features.expertTeam.description"),
              },
              {
                icon: ClockIcon,
                title: t("services.features.flexibleScheduling.title"),
                description: t(
                  "services.features.flexibleScheduling.description"
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
                {...({} as any)}
              >
                <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-2xl p-6 mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
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
              {t("services.readyToTransform")}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t("services.readyDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact#book-appointment`}
                className="bg-white text-[#44B0B6] font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block"
              >
                {t("services.bookConsultation")}
              </a>
              <a
                href="tel:+38970515734"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full hover:bg-white hover:text-[#44B0B6] transition-all duration-300 inline-block"
              >
                {t("services.callNow")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
