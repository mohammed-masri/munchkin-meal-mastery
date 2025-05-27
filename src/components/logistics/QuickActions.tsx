
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  UserPlus, 
  PlusCircle, 
  ChefHat,
  ClipboardCheck,
  ClipboardList,
  UtensilsCrossed,
  Scale,
  Timer
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

export function QuickActions() {
  const { toast } = useToast();
  const location = useLocation();
  const isDistributionPage = location.pathname === '/distribution';

  const handleAction = (action: string) => {
    toast({
      title: `${action} initiated`,
      description: `You've started the ${action.toLowerCase()} process.`,
    });
  };

  const getContextActions = () => {
    if (isDistributionPage) {
      return [
        { 
          name: "Scan Labels", 
          icon: ClipboardCheck, 
          color: "text-secondary",
          onClick: () => handleAction("Label Scanning")
        },
        { 
          name: "Generate Report", 
          icon: ClipboardList, 
          color: "text-primary",
          onClick: () => handleAction("Report Generation")
        }
      ];
    }
    
    // Production actions
    return [
      { 
        name: "Start Production", 
        icon: ChefHat, 
        color: "text-primary",
        onClick: () => handleAction("Production")
      },
      { 
        name: "Record Measurements", 
        icon: Scale, 
        color: "text-secondary",
        onClick: () => handleAction("Measurements")
      },
      { 
        name: "Set Timer", 
        icon: Timer, 
        color: "text-accent",
        onClick: () => handleAction("Timer")
      },
      { 
        name: "Menu Check", 
        icon: UtensilsCrossed, 
        color: "text-highlight",
        onClick: () => handleAction("Menu Check")
      }
    ];
  };

  const actions = getContextActions();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 h-9">
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline-block">Quick Actions</span>
          <MoreHorizontal className="h-4 w-4 sm:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background">
        {actions.map((action) => (
          <DropdownMenuItem 
            key={action.name} 
            onClick={action.onClick} 
            className="gap-2 cursor-pointer"
          >
            <action.icon className={`h-4 w-4 ${action.color}`} />
            <span>{action.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
