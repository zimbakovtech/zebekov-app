import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["mk", "en", "bg"],
  defaultLocale: "mk",
});

export const config = {
  matcher: ["/", "/(mk|en|bg)/:path*"],
};
