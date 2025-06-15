import Sidebar from '@/components/Sidebar'
import './globals.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </div>
  )
}