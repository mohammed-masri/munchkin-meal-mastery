
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DistributionFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onFilterChange: (value: string) => void;
}

export function DistributionFilter({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange
}: DistributionFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-52">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search nursery..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Select defaultValue={filterStatus} onValueChange={onFilterChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="ready">Ready</SelectItem>
          <SelectItem value="preparing">Preparing</SelectItem>
          <SelectItem value="in-transit">In Transit</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
