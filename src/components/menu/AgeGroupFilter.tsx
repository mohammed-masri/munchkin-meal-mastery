
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgeGroupFilterProps {
  selectedAgeGroup: string | null;
  onSelect: (group: string | null) => void;
}

export function AgeGroupFilter({ selectedAgeGroup, onSelect }: AgeGroupFilterProps) {
  const ageGroups = ['0-1', '1-2', '2-3', '3-4', '4-5'];
  
  return (
    <div className="flex flex-col gap-1">
      {ageGroups.map(group => (
        <Button
          key={group}
          variant="ghost"
          size="sm"
          className={cn(
            "justify-start h-8",
            selectedAgeGroup === group ? "bg-primary text-primary-foreground" : ""
          )}
          onClick={() => onSelect(selectedAgeGroup === group ? null : group)}
        >
          {group} years
        </Button>
      ))}
    </div>
  );
}
