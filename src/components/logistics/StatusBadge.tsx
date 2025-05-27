
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, AlertTriangle, Truck } from 'lucide-react';

export type StatusType = 'ready' | 'preparing' | 'in-transit' | 'delivered';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'ready':
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          <PackageCheck className="h-3 w-3 mr-1" /> Ready
        </Badge>
      );
    case 'preparing':
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <AlertTriangle className="h-3 w-3 mr-1" /> Preparing
        </Badge>
      );
    case 'in-transit':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Truck className="h-3 w-3 mr-1" /> In Transit
        </Badge>
      );
    case 'delivered':
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-800 hover:bg-slate-100">
          <PackageCheck className="h-3 w-3 mr-1" /> Delivered
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
