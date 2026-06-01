import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, Users, ShoppingCart, X } from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
]

export default function Sidebar({ open, onClose }) {
  const location = useLocation()

  useEffect(() => {
    onClose?.()
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  const nav = (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-border flex flex-col h-full">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <span className="text-xl font-bold text-brand-600">StockFlow</span>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-border">
        <p className="text-xs text-gray-400">v1.0.0</p>
      </div>
    </aside>
  )

  return (
    <>
      <div className="hidden lg:flex flex-shrink-0">{nav}</div>

      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 lg:hidden ${
          open ? 'bg-opacity-50 pointer-events-auto' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 flex-shrink-0 transform transition-transform duration-300 ease-in-out lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        {nav}
      </div>
    </>
  )
}
