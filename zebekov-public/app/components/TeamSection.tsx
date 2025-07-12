"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { title } from "process";

export default function TeamSection() {
  const t = useTranslations();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const teamMembers = [
    {
      id: 1,
      image: "../images/doctors/toskoZebekov.jpg",
      translationKey: "toskoZebekov",
    },
    {
      id: 2,
      image: "../images/doctors/gonceVasileva.jpg",
      translationKey: "gonceVasilevaKoleva",
    },
    {
      id: 3,
      image: "../images/doctors/kirePopcev.jpg",
      translationKey: "kirePopcev",
    },
    {
      id: 4,
      image: "../images/doctors/blagicaTrencev.jpg",
      translationKey: "blagicaTrencev",
    },
    {
      id: 5,
      image: "../images/doctors/emilijaStojceva.jpg",
      translationKey: "emilijaStojceva",
    },
    {
      id: 6,
      image: "../images/doctors/ljupcoBikovski.jpg",
      translationKey: "ljupcoBikovski",
    },
    {
      id: 7,
      image: "../images/doctors/adrijanaKotev.jpg",
      translationKey: "adrijanaKotev",
    },
    {
      id: 8,
      image: "../images/doctors/anaKacarska.jpg",
      translationKey: "anaKacarska",
    },
    {
      id: 9,
      image: "../images/doctors/lenceZimbakova.jpg",
      translationKey: "lenceZimbakova",
    },
    {
      id: 10,
      image: "../images/doctors/vericaCukarska.jpg",
      translationKey: "vericaCukarska",
    },
    {
      id: 11,
      image: "../images/doctors/froskaIvanova.jpg",
      translationKey: "froskaIvanova",
    },
    {
      id: 12,
      image: "../images/doctors/ivanaStojkova.jpg",
      translationKey: "ivanaStojkova",
    },
    {
      id: 13,
      image: "../images/doctors/bojanaBozinova.jpg",
      translationKey: "bojanaBozinova",
    },
    {
      id: 14,
      image: "../images/doctors/vericaIlieva.jpg",
      translationKey: "vericaIlieva",
    },
    {
      id: 15,
      image: "../images/doctors/anetaTodorova.jpg",
      translationKey: "anetaTodorova",
    },
    {
      id: 16,
      image: "../images/doctors/gordanaStoev.jpg",
      translationKey: "gordanaStoev",
    },
    {
      id: 17,
      image: "../images/doctors/emilijaTrbogazova.jpg",
      translationKey: "emilijaTrbogazova",
    },
    {
      id: 18,
      image: "../images/doctors/emilijaCvetkova.jpg",
      translationKey: "emilijaCvetkova",
    },
  ];

  // Calculate items per page based on screen size
  const getItemsPerPage = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 1 : 3; // 1 on mobile, 3 on desktop
    }
    return 3; // Default for SSR
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % Math.ceil(teamMembers.length / itemsPerPage)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerPage]);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.ceil(teamMembers.length / itemsPerPage)
    );
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(teamMembers.length / itemsPerPage)) %
        Math.ceil(teamMembers.length / itemsPerPage)
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          {...({} as any)}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("team.title")}{" "}
            <span className="gradient-text">{t("team.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("team.subtitle")}
          </p>
        </motion.div>

        {/* Team Carousel */}
        {/* Carousel Wrapper */}
        <div className="relative max-w-6xl mx-auto">
          {/* Overflow & Mask */}
          <div className="overflow-hidden rounded-2xl">
            {/* Sliding Container */}
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              {...({} as any)}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Pages of team members */}
              {Array.from({
                length: Math.ceil(teamMembers.length / itemsPerPage),
              }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {teamMembers
                      .slice(
                        pageIndex * itemsPerPage,
                        pageIndex * itemsPerPage + itemsPerPage
                      )
                      .map((member) => (
                        <div
                          key={member.id}
                          className="relative overflow-hidden rounded-2xl shadow-2xl"
                        >
                          {/* Photo */}
                          <img
                            src={member.image}
                            alt={t(`team.${member.translationKey}.name`)}
                            className="w-full h-[32rem] object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#44B0B6]/20 to-transparent"></div>

                          {/* Text Content */}
                          <div className="p-4 bg-white">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {t(`team.${member.translationKey}.name`)}
                            </h3>
                            <p className="text-sm text-[#44B0B6] font-semibold mb-1">
                              {t(`team.${member.translationKey}.title`)}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              {t(
                                `team.${member.translationKey}.specialization`
                              )}
                            </p>
                            <p className="text-xs text-gray-700 leading-snug">
                              {t(`team.${member.translationKey}.description`)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Prev Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Dots */}
          <div className="flex justify-center space-x-3 mt-6">
            {Array.from({
              length: Math.ceil(teamMembers.length / itemsPerPage),
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  idx === currentIndex
                    ? "bg-[#44B0B6] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          {...({} as any)}
        >
          {[
            { number: "11", label: t("team.expertDentists") },
            { number: "78", label: t("team.appointmentsDaily") },
            { number: "6", label: t("team.specializations") },
            { number: "100%", label: t("team.patientSatisfaction") },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#44B0B6] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
