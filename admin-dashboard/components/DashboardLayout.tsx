'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('access_token')
    if (!isLoggedIn && pathname !== '/login') {
      router.push('/login')
    }
  }, [pathname, router])

  if (pathname === '/login') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>
    </div>
  )
} 