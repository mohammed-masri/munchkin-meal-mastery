
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpecialRequirementsTable } from './SpecialRequirementsTable';
import { PackagingDispatchTable } from './PackagingDispatchTable';
import { DistributionFilter } from './DistributionFilter';
import { StatusBadge } from './StatusBadge';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

// Define the type for our distribution data
interface SpecialRequirement {
  type: string;
  count: number;
}

interface Distribution {
  nursery: string;
  specialDiets: number;
  status: 'ready' | 'preparing' | 'in-transit' | 'delivered';
  childrenPresent: number;
  dispatchTime?: string;
  driver?: string;
  route?: string;
  specialRequirements: SpecialRequirement[];
  breakfast?: number;
  lunch?: number;
  snack?: number;
}

interface MealDistributionProps {
  date: Date;
}

export function MealDistribution({ date }: MealDistributionProps) {
  const [activeTab, setActiveTab] = useState('special');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const distributions: Distribution[] = [
    {
      nursery: 'Sunshine Nursery',
      specialDiets: 4,
      status: 'ready',
      childrenPresent: 42,
      dispatchTime: '10:30 AM',
      driver: 'John Smith',
      route: 'North Route',
      specialRequirements: [
        { type: 'Gluten-Free', count: 2 },
        { type: 'Dairy-Free', count: 1 },
        { type: 'Egg-Free', count: 1 }
      ]
    },
    {
      nursery: 'Rainbow Daycare',
      breakfast: 12,
      lunch: 36,
      snack: 33,
      specialDiets: 6,
      status: 'preparing',
      childrenPresent: 36,
      specialRequirements: [
        { type: 'Gluten-Free', count: 3 },
        { type: 'Nut-Free', count: 2 },
        { type: 'Vegetarian', count: 1 }
      ]
    },
    {
      nursery: 'Little Explorers',
      breakfast: 18,
      lunch: 51,
      snack: 45,
      specialDiets: 8,
      status: 'ready',
      childrenPresent: 51,
      specialRequirements: [
        { type: 'Dairy-Free', count: 3 },
        { type: 'Gluten-Free', count: 2 },
        { type: 'Vegetarian', count: 3 }
      ]
    },
    {
      nursery: 'Growing Minds',
      breakfast: 13,
      lunch: 29,
      snack: 27,
      specialDiets: 5,
      status: 'in-transit',
      childrenPresent: 29,
      specialRequirements: [
        { type: 'Nut-Free', count: 2 },
        { type: 'Dairy-Free', count: 2 },
        { type: 'Egg-Free', count: 1 }
      ]
    },
    {
      nursery: 'Tiny Tots',
      breakfast: 8,
      lunch: 22,
      snack: 20,
      specialDiets: 3,
      status: 'delivered',
      childrenPresent: 22,
      specialRequirements: [
        { type: 'Gluten-Free', count: 1 },
        { type: 'Vegan', count: 1 },
        { type: 'Nut-Free', count: 1 }
      ]
    }
  ];

  const filteredDistributions = distributions.filter(dist => {
    if (filterStatus !== 'all' && dist.status !== filterStatus) return false;
    if (searchQuery && !dist.nursery.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <CardTitle>Distribution Status</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>For {format(date, 'PPPP')}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="special" className="space-y-4">
          <div className="flex justify-between items-center pb-4">
            <TabsList className="w-auto">
              <TabsTrigger value="special">Special Requirements</TabsTrigger>
              <TabsTrigger value="packaging">Packaging & Dispatch</TabsTrigger>
            </TabsList>
            
            <DistributionFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>
          
          <TabsContent value="special" className="space-y-4">
            <SpecialRequirementsTable
              distributions={filteredDistributions}
              getStatusBadge={(status) => <StatusBadge status={status as any} />}
            />
          </TabsContent>
          
          <TabsContent value="packaging" className="space-y-4">
            <PackagingDispatchTable
              distributions={filteredDistributions}
              getStatusBadge={(status) => <StatusBadge status={status as any} />}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
