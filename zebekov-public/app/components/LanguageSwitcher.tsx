"use client";

<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/outline";

const languages = [
  { code: "mk", name: "Македонски" },
  { code: "en", name: "English" },
  { code: "bg", name: "Български" },
=======
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/outline';

const languages = [
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];
=======
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // Remove the current locale from the pathname
<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
      const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
=======
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
      // Navigate to the new locale
      router.replace(`/${newLocale}${pathWithoutLocale}`);
    });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        disabled={isPending}
      >
<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.name}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
=======
        <LanguageIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
        <ChevronDownIcon 
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

=======
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
              {...({} as any)}
=======
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${
<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
                    locale === language.code
                      ? "bg-[#44B0B6]/10 text-[#44B0B6]"
                      : "text-gray-700"
                  }`}
                  disabled={isPending}
                >
=======
                    locale === language.code ? 'bg-[#44B0B6]/10 text-[#44B0B6]' : 'text-gray-700'
                  }`}
                  disabled={isPending}
                >
                  <span className="text-lg">{language.flag}</span>
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
                  <span className="text-sm font-medium">{language.name}</span>
                  {locale === language.code && (
                    <div className="ml-auto w-2 h-2 bg-[#44B0B6] rounded-full" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
<<<<<<< HEAD:zebekov-public/app/components/LanguageSwitcher.tsx
}
=======
}
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/app/components/LanguageSwitcher.tsx
