
import React, { useState } from 'react';
import { SideNavigation } from './SideNavigation';
import { TopBar } from './TopBar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      <SideNavigation collapsed={sidebarCollapsed} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <TopBar onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
