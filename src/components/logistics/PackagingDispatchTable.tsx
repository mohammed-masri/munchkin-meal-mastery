
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';

interface Distribution {
  nursery: string;
  childrenPresent: number;
  status: 'ready' | 'preparing' | 'in-transit' | 'delivered';
  dispatchTime?: string;
  driver?: string;
  route?: string;
}

interface PackagingDispatchTableProps {
  distributions: Distribution[];
  getStatusBadge: (status: 'ready' | 'preparing' | 'in-transit' | 'delivered') => React.ReactNode;
}

export function PackagingDispatchTable({ distributions, getStatusBadge }: PackagingDispatchTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nursery</TableHead>
          <TableHead>Children Present</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Dispatch Time</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Route</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {distributions.map((dist) => (
          <TableRow key={dist.nursery}>
            <TableCell className="font-medium">{dist.nursery}</TableCell>
            <TableCell>{dist.childrenPresent}</TableCell>
            <TableCell>
              {getStatusBadge(dist.status)}
            </TableCell>
            <TableCell>{dist.dispatchTime}</TableCell>
            <TableCell>{dist.driver}</TableCell>
            <TableCell>{dist.route}</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8"
                disabled={dist.status === 'preparing'}
              >
                {dist.status === 'ready' ? 'Dispatch' : 'Track'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
