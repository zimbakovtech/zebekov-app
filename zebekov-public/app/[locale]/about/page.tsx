"use client";

import { motion } from "framer-motion";
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useLocale, useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale();

  const values = [
    {
      icon: HeartIcon,
      title: t("about.values.patientCenteredCare.title"),
      description: t("about.values.patientCenteredCare.description"),
    },
    {
      icon: ShieldCheckIcon,
      title: t("about.values.qualitySafety.title"),
      description: t("about.values.qualitySafety.description"),
    },
    {
      icon: UserGroupIcon,
      title: t("about.values.professionalExcellence.title"),
      description: t("about.values.professionalExcellence.description"),
    },
    {
      icon: AcademicCapIcon,
      title: t("about.values.continuousLearning.title"),
      description: t("about.values.continuousLearning.description"),
    },
  ];

  const achievements = [
    {
      icon: SparklesIcon,
      title: t("about.achievements.modernTechnology.title"),
      description: t("about.achievements.modernTechnology.description"),
    },
    {
      icon: UserGroupIcon,
      title: t("about.achievements.happyPatients.title"),
      description: t("about.achievements.happyPatients.description"),
    },
    {
      icon: ShieldCheckIcon,
      title: t("about.achievements.experience.title"),
      description: t("about.achievements.experience.description"),
    },
  ];

  const timeline = [
    {
      year: "2008",
      title: t("about.timeline.2008.title"),
      description: t("about.timeline.2008.description"),
    },
    {
      year: "2012",
      title: t("about.timeline.2012.title"),
      description: t("about.timeline.2012.description"),
    },
    {
      year: "2016",
      title: t("about.timeline.2016.title"),
      description: t("about.timeline.2016.description"),
    },
    {
      year: "2020",
      title: t("about.timeline.2020.title"),
      description: t("about.timeline.2020.description"),
    },
    {
      year: "2024",
      title: t("about.timeline.2024.title"),
      description: t("about.timeline.2024.description"),
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="../images/background.jpg"
            alt="About us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("about.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                {t("about.titleHighlight")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t("about.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("about.ourStory")}{" "}
                <span className="gradient-text">
                  {t("about.ourStoryHighlight")}
                </span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>{t("about.storyParagraph1")}</p>
                <p>{t("about.storyParagraph2")}</p>
                <p>{t("about.storyParagraph3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
              {...({} as any)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="../images/aboutus.jpg"
                  alt="Dental Center Zebekov Team"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#44B0B6]/20 to-transparent"></div>
              </div>
              {/* Floating stats */}
              <div className="absolute -bottom-8 -left-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#44B0B6] mb-1">
                    25+
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("about.yearsOfExcellence")}
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#44B0B6] mb-1">
                    5000+
                  </div>
                  <div className="text-xs text-gray-600">
                    {t("about.happyPatients")}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            {...({} as any)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.ourValues")}{" "}
              <span className="gradient-text">
                {t("about.ourValuesHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.valuesSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2 flex flex-col items-center justify-center"
                {...({} as any)}
              >
                <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      {/* <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            {...({} as any)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.ourJourney")}{" "}
              <span className="gradient-text">
                {t("about.ourJourneyHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.journeySubtitle")}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#44B0B6] to-[#3A9BA1] rounded-full"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                  {...({} as any)}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl font-bold text-[#44B0B6] mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 w-6 h-6 bg-[#44B0B6] rounded-full border-4 border-white shadow-lg"></div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Achievements */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
            {...({} as any)}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.ourAchievements")}{" "}
              <span className="gradient-text">
                {t("about.ourAchievementsHighlight")}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.achievementsSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                {...({} as any)}
              >
                <div className="bg-gradient-to-br from-[#44B0B6] to-[#3A9BA1] rounded-2xl p-4 inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-[#44B0B6] to-[#3A9BA1] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.joinOurFamily")}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t("about.joinDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${locale}/contact#book-appointment`}
                className="bg-white text-[#44B0B6] font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-block"
              >
                {t("about.scheduleConsultation")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
