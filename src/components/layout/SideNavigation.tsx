
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Utensils, 
  ChefHat,
  Package2,
  BarChart, 
  MessageSquare,
  Settings, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface SideNavigationProps {
  collapsed: boolean;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

export function SideNavigation({ collapsed }: SideNavigationProps) {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Menu Management', icon: Utensils, path: '/menu' },
    { title: 'Production', icon: ChefHat, path: '/production' },
    { title: 'Distribution', icon: Package2, path: '/distribution' },
    { title: 'Reports', icon: BarChart, path: '/reports' },
    { title: 'Communications', icon: MessageSquare, path: '/communications' },
    { title: 'Guide', icon: BookOpen, path: '/guide' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-30 h-screen bg-background border-r transition-all duration-300 ease-in-out", 
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-center border-b px-4 bg-primary">
        {collapsed ? (
          <div className="w-8 h-8 flex items-center justify-center bg-white text-primary rounded-full">
            <Utensils size={16} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-white text-primary rounded-full">
              <Utensils size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-lg">Nutrio</span>
              <span className="text-white/80 text-xs">The Meal Management System</span>
            </div>
          </div>
        )}
      </div>
      
      <nav className="mt-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive 
                      ? "bg-primary text-white" 
                      : "text-foreground hover:bg-highlight hover:text-primary"
                  )}
                >
                  <Icon 
                    size={20} 
                    className={isActive ? "text-white" : "text-primary"}
                  />
                  {!collapsed && (
                    <span>{item.title}</span>
                  )}
                  {!collapsed && isActive && (
                    <ChevronRight size={16} className="ml-auto text-white" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
