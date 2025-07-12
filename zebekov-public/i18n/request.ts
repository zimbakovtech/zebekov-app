import { requestLocale } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["mk", "en", "bg"] as const;
export const defaultLocale = "mk";

export default {
  locales,
  defaultLocale,
  getRequestConfig: async () => {
    const locale = await requestLocale();

    // Optional: fallback if locale is invalid
    const safeLocale = locales.includes(locale as any) ? locale : defaultLocale;

    return {
      messages: (await import(`./messages/${safeLocale}.json`)).default,
    };
  },
};
