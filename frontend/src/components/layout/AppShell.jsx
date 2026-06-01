import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen overflow-hidden bg-surface'>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className='flex-1 flex flex-col overflow-hidden min-w-0'>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className='flex-1 overflow-y-auto p-4 sm:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
