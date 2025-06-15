import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: 'Dental Center Zebekov - Your Perfect Smile Starts Here',
  description: 'Experience exceptional dental care with our team of expert dentists in Skopje and Ohrid. Modern technology, comfortable environment, and personalized treatment for every patient.',
  keywords: 'dental care, dentist, Skopje, Ohrid, Macedonia, cosmetic dentistry, orthodontics, oral surgery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.zebekov.mk/assets/official_logo.svg" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}