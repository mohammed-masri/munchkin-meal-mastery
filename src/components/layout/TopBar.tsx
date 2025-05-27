
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Menu, 
  ChevronLeft,
  Search,
  User
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface TopBarProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export function TopBar({ onToggleSidebar, sidebarCollapsed }: TopBarProps) {
  return (
    <header className="h-14 border-b bg-background shadow-sm sticky top-0 z-20">
      <div className="flex h-14 items-center px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="mr-2 text-primary"
        >
          {sidebarCollapsed ? <Menu /> : <ChevronLeft />}
        </Button>
        
        <div className="flex-1">
          <div className="relative hidden md:flex items-center w-full max-w-sm">
            <Search className="absolute left-2.5 h-4 w-4 text-muted" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border border-input bg-card px-3 py-2 pl-8 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-highlight">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-highlight rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background">
              <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-foreground">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground">Help</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-foreground">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
