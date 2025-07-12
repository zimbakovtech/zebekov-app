<<<<<<< HEAD:zebekov-public/middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["mk", "en", "bg"],
  defaultLocale: "mk",
});

export const config = {
  matcher: ["/", "/(mk|en|bg)/:path*"],
};
=======
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['mk', 'en'],

  // Used when no locale matches
  defaultLocale: 'mk'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(mk|en)/:path*']
};
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901:public-site/middleware.ts
