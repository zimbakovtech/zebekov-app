import Link from 'next/link'

export default function Sidebar() {
  const links = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/schedule', label: 'Schedule' },
    { href: '/admin/shifts', label: 'Shifts' },
    { href: '/admin/services', label: 'Services' },
  ]
  return (
    <nav className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl mb-6">Zebekov Admin</h2>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="py-2 hover:bg-gray-700 rounded">
          {link.label}
        </Link>
      ))}
    </nav>
  )
}