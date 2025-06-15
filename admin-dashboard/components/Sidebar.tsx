"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import * as HeroIcons from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HeroIcons.ClipboardDocumentListIcon },
  { name: 'Appointments', href: '/appointments', icon: HeroIcons.CalendarIcon },
  { name: 'Doctors', href: '/doctors', icon: HeroIcons.UserGroupIcon },
  { name: 'Services', href: '/services', icon: HeroIcons.WrenchScrewdriverIcon },
  { name: 'Shifts', href: '/shifts', icon: HeroIcons.ClockIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, sidebar starts closed; on desktop it opens
      setIsCollapsed(mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar panel */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white transition-transform duration-300 ease-in-out',
          {
            '-translate-x-full': isCollapsed,
            'translate-x-0': !isCollapsed,
          },
          'lg:static lg:translate-x-0 lg:flex'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Image
              src="https://www.zebekov.mk/assets/official_logo.svg"
              alt="Zebekov Dental"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            {!isCollapsed && (
              <span className="ml-2 text-md font-semibold text-gray-900">
                <span className="text-gray-700">Dental Center </span>
                <span style={{ color: '#44B0B6' }}>Zebekov</span>
              </span>
            )}
          </div>
          {/* Close button on mobile */}
          {isMobile && (
            <button
              className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsCollapsed(true)}
              aria-label="Close sidebar"
            >
              <HeroIcons.XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                  {
                    'bg-primary text-[#44B0B6]': isActive,
                    'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !isActive,
                  }
                )}
              >
                <item.icon
                  className={clsx('mr-3 h-6 w-6 flex-shrink-0', {
                    'text-[#44B0B6]': isActive,
                    'text-gray-400 group-hover:text-gray-500': !isActive,
                  })}
                  aria-hidden="true"
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu button */}
      {isMobile && (
        <div className="sticky top-0 z-10 flex h-16 items-center bg-white shadow lg:hidden">
          <button
            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsCollapsed(false)}
            aria-label="Open sidebar"
          >
            <HeroIcons.Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 items-center justify-center px-4">
            <Image
              src="https://www.zebekov.mk/assets/official_logo.svg"
              alt="Zebekov Dental"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              <span className="text-gray-700">Dental Center </span>
              <span style={{ color: '#44B0B6' }}>Zebekov</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
