import React, { useState } from 'react';
import { Outlet } from '@/lib/navigation';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { cn } from '@/lib/utils';

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="trust-workspace min-h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        )}
      >
        <TopBar onOpenMobileNav={() => setMobileOpen(true)} />

        {/* Page transition wrapper — PRIMARY layer: fade + translateY */}
        <main className="trust-workspace-content flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto animate-page-enter">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-400">
          <p>
            TRUST Escrow Platform © {new Date().getFullYear()} —{' '}
            <span className="font-semibold text-[#7B3DFF]">Trust every transaction.</span>
          </p>
        </footer>
      </div>
    </div>
  );
};
