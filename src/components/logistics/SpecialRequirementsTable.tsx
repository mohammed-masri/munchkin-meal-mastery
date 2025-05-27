
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';

interface SpecialRequirement {
  type: string;
  count: number;
}

interface Distribution {
  nursery: string;
  specialDiets: number;
  status: 'ready' | 'preparing' | 'in-transit' | 'delivered';
  specialRequirements: SpecialRequirement[];
}

interface SpecialRequirementsTableProps {
  distributions: Distribution[];
  getStatusBadge: (status: 'ready' | 'preparing' | 'in-transit' | 'delivered') => React.ReactNode;
}

export function SpecialRequirementsTable({ distributions, getStatusBadge }: SpecialRequirementsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nursery</TableHead>
          <TableHead>Total Special Diets</TableHead>
          <TableHead>Diet Requirements</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {distributions.map((dist) => (
          <TableRow key={dist.nursery}>
            <TableCell className="font-medium">{dist.nursery}</TableCell>
            <TableCell>{dist.specialDiets}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {dist.specialRequirements.map((req, idx) => (
                  <Badge key={idx} variant="outline" className="mr-1">
                    {req.type} ({req.count})
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              {getStatusBadge(dist.status)}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm" className="h-8">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
