import { Menu } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
  return (
    <header className='h-16 bg-white border-b border-border flex items-center px-4 sm:px-6 shadow-sm gap-3 flex-shrink-0'>
      {/* Hamburger — only on mobile */}
      <button
        onClick={onMenuClick}
        className='lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500'
        aria-label='Open navigation'
      >
        <Menu size={20} />
      </button>
      <h1 className='text-base sm:text-lg font-semibold text-gray-900'>Inventory Management</h1>
    </header>
  );
}
