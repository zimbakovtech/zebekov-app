import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import '../globals.css'
import DashboardLayout from '../../components/DashboardLayout'

export const metadata: Metadata = {
  title: 'Dental Center Zebekov - Admin Dashboard',
  description: 'Admin dashboard for managing dental appointments, doctors, services, and shifts.',
}

const inter = Inter({ subsets: ['latin'] })

export default async function LocaleLayout({ 
  children,
  params: {locale}
}: { 
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <DashboardLayout>{children}</DashboardLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}