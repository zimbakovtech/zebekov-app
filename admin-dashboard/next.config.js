const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
};

<<<<<<< HEAD
module.exports = config;
=======
module.exports = withNextIntl(config);
>>>>>>> 084604cb4be165d7ab5e5c172967dd98e5938901
