
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package2, 
  PackageCheck, 
  Printer, 
  ListCheck, 
  Clock,
  Search,
  School,
  CheckSquare,
  CalendarDays
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ContainerLabelPreview } from './ContainerLabelPreview';
import { format } from 'date-fns';

interface ContainerPackingProps {
  date: Date;
}

export function ContainerPacking({ date }: ContainerPackingProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [showLabelPreview, setShowLabelPreview] = useState(false);

  const handlePrintContainerLabel = (nursery: string) => {
    toast({
      title: "Container Label Printed",
      description: `${nursery} container label has been sent to printer`,
    });
  };

  const containers = [
    {
      id: "C001",
      nursery: "Al Badee Nursery",
      className: "Sunshine Class",
      ageGroup: "3-4 years",
      mealType: "Lunch",
      totalMeals: 8,
      regularMeals: 5,
      specialDiets: [
        { type: "Gluten-Free", count: 2 },
        { type: "Dairy-Free", count: 1 }
      ],
      packedCount: 6,
      status: "in-progress"
    },
    {
      id: "C002",
      nursery: "Al Qulayaa Nursery",
      className: "Starlight Room",
      ageGroup: "4-5 years",
      mealType: "Lunch",
      totalMeals: 12,
      regularMeals: 8,
      specialDiets: [
        { type: "Nut-Free", count: 3 },
        { type: "Vegetarian", count: 1 }
      ],
      packedCount: 12,
      status: "ready"
    },
    {
      id: "C003",
      nursery: "Al Rahmaniya Nursery",
      className: "Discovery Class",
      ageGroup: "2-3 years",
      mealType: "Lunch",
      totalMeals: 9,
      regularMeals: 8,
      specialDiets: [
        { type: "Vegetarian", count: 1 }
      ],
      packedCount: 4,
      status: "in-progress"
    },
    {
      id: "C004",
      nursery: "Maleha Nursery",
      className: "Class A2",
      ageGroup: "3-4 years",
      mealType: "Lunch",
      totalMeals: 18,
      regularMeals: 15,
      specialDiets: [
        { type: "Nut-Free", count: 2 },
        { type: "Vegetarian", count: 1 }
      ],
      packedCount: 0,
      status: "pending"
    }
  ];

  const filteredContainers = containers.filter(container => {
    if (searchQuery && !container.nursery.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !container.className.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  const getProgressValue = (packedCount, totalMeals) => {
    return (packedCount / totalMeals) * 100;
  };

  const getStatusBadge = (status, packedCount, totalMeals) => {
    if (packedCount === totalMeals) {
      return <Badge variant="outline" className="bg-green-100 text-green-800">Ready for Dispatch</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="flex items-center gap-1"><Package2 className="h-3 w-3" /> In Progress</Badge>;
      case 'ready':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Ready for Dispatch</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewContainerLabel = (container) => {
    setSelectedContainer(container);
    setShowLabelPreview(true);
  };

  const handleMarkContainerReady = (containerId, nursery) => {
    toast({
      title: "Container Ready",
      description: `${nursery} container has been marked as ready for dispatch`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Container Packing Status
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>For {format(date, 'PPPP')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[220px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search nursery or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nursery & Class</TableHead>
                <TableHead>Meal Type</TableHead>
                <TableHead>Total Meals</TableHead>
                <TableHead>Special Diets</TableHead>
                <TableHead>Packing Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContainers.map((container) => (
                <TableRow key={container.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{container.nursery}</div>
                        <div className="text-xs text-muted-foreground">
                          {container.className} ({container.ageGroup})
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{container.mealType}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{container.totalMeals}</span>
                      <div className="text-xs text-muted-foreground">
                        {container.regularMeals} Regular
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {container.specialDiets.map((diet, index) => (
                        <div key={index} className="text-sm">
                          {diet.type}: <span className="font-medium">{diet.count}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{container.packedCount} of {container.totalMeals} packed</span>
                        <span>{Math.round(getProgressValue(container.packedCount, container.totalMeals))}%</span>
                      </div>
                      <Progress value={getProgressValue(container.packedCount, container.totalMeals)} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(container.status, container.packedCount, container.totalMeals)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleViewContainerLabel(container)}
                      >
                        <ListCheck className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handlePrintContainerLabel(container.nursery)}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8"
                        disabled={container.packedCount !== container.totalMeals}
                        onClick={() => handleMarkContainerReady(container.id, container.nursery)}
                      >
                        <PackageCheck className="h-4 w-4 mr-2" />
                        Ready
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showLabelPreview && selectedContainer && (
        <ContainerLabelPreview 
          container={selectedContainer} 
          onClose={() => setShowLabelPreview(false)}
          onPrint={() => {
            handlePrintContainerLabel(selectedContainer.nursery);
            setShowLabelPreview(false);
          }}
        />
      )}
    </>
  );
}
