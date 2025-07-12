"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Remove locale prefix from pathname for comparison
  const cleanPathname = pathname.replace(`/${locale}`, "") || "/";
  const isHomePage = cleanPathname === "/";

  const navigation = [
    { name: t("navigation.home"), href: `/${locale}` },
    { name: t("navigation.services"), href: `/${locale}/services` },
    { name: t("navigation.locations"), href: `/${locale}/locations` },
    { name: t("navigation.about"), href: `/${locale}/about` },
    { name: t("navigation.contact"), href: `/${locale}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      {...({} as any)}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 p-2">
            <img
              src="https://www.zebekov.mk/assets/official_logo.svg"
              alt="Dental Center Zebekov"
              className="h-10 w-auto sm:h-12"
            />
            <div className="block">
              <h1 className="text-base sm:text-xl font-bold">
                <span className="text-black">Dental Center</span>{" "}
                <span
                  className={`${
                    isHomePage && !isScrolled ? "text-white" : "text-[#44B0B6]"
                  } transition-colors duration-200`}
                >
                  Zebekov
                </span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-colors duration-200 ${
                  cleanPathname === item.href.replace(`/${locale}`, "") ||
                  (cleanPathname === "/" && item.href === `/${locale}`)
                    ? "text-[#44B0B6]"
                    : isScrolled
                    ? "text-gray-700 hover:text-[#44B0B6]"
                    : isHomePage
                    ? "text-white hover:text-[#44B0B6]"
                    : "text-gray-700 hover:text-[#44B0B6]"
                }`}
              >
                {item.name}
                {(cleanPathname === item.href.replace(`/${locale}`, "") ||
                  (cleanPathname === "/" && item.href === `/${locale}`)) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#44B0B6]"
                    {...({} as any)}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Contact & Appointment & Language */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${t("header.phone")}`}
              className="flex items-center space-x-2 text-[#44B0B6] hover:text-[#3A9BA1] transition-colors"
            >
              <span className="font-medium">{t("header.phone")}</span>
            </a>
            <Link
              href={`/${locale}/contact#book-appointment`}
              className="btn-primary"
            >
              {t("header.bookAppointment")}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isHomePage && !isScrolled ? "text-white" : "text-gray-700"
            }`}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            ) : (
              <Bars3Icon className="h-6 w-6 sm:h-8 sm:w-8" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 mb-4"
              {...({} as any)}
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 font-medium transition-colors ${
                      cleanPathname === item.href.replace(`/${locale}`, "") ||
                      (cleanPathname === "/" && item.href === `/${locale}`)
                        ? "text-[#44B0B6] bg-[#44B0B6]/10"
                        : "text-gray-700 hover:text-[#44B0B6] hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-4 py-2 space-y-3">
                  <a
                    href={`tel:${t("header.phone")}`}
                    className="flex items-center space-x-2 text-[#44B0B6]"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    <span className="font-medium">{t("header.phone")}</span>
                  </a>
                  <Link
                    href={`/${locale}/contact#book-appointment`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary block text-center"
                  >
                    {t("header.bookAppointment")}
                  </Link>
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
