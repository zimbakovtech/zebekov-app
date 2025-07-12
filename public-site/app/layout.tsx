import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: 'Dental Center Zebekov - Your Perfect Smile Starts Here',
  description: 'Experience exceptional dental care with our team of expert dentists in Skopje and Ohrid. Modern technology, comfortable environment, and personalized treatment for every patient.',
  keywords: 'dental care, dentist, Skopje, Ohrid, Macedonia, cosmetic dentistry, orthodontics, oral surgery',
};

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="https://www.zebekov.mk/assets/official_logo.svg" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}