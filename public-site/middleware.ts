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