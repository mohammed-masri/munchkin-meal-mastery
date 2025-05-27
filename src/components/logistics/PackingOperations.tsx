
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package2,
  QrCode, 
  Check, 
  Clock, 
  Search, 
  AlertTriangle, 
  User,
  Baby,
  School,
  UtensilsCrossed,
  Printer,
  Tag,
  CalendarDays
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MealLabelPreview } from './MealLabelPreview';
import { format } from 'date-fns';

interface PackingOperationsProps {
  date: Date;
}

export function PackingOperations({ date }: PackingOperationsProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedChild, setSelectedChild] = useState(null);
  const [showLabelPreview, setShowLabelPreview] = useState(false);

  const handleMarkPacked = (childId: string, childName: string) => {
    toast({
      title: "Meal Packed",
      description: `${childName}'s meal has been marked as packed`,
    });
  };

  const handlePrintLabel = (childId: string, childName: string) => {
    toast({
      title: "Label Printed",
      description: `Label for ${childName}'s meal has been sent to printer`,
    });
  };

  const handleViewLabelPreview = (child) => {
    setSelectedChild(child);
    setShowLabelPreview(true);
  };

  const items = [
    {
      id: "RD001",
      nursery: "Rainbow Daycare",
      class: "Sunshine Class",
      childName: "Emma Johnson",
      childCode: "RD001",
      ageGroup: "3-4 years",
      dietaryRequirements: ["Gluten-Free"],
      mealType: "Lunch",
      status: "pending",
      priority: "high",
      packingTime: "10:30 AM"
    },
    {
      id: "RD002",
      nursery: "Rainbow Daycare",
      class: "Sunshine Class",
      childName: "Lucas Miller",
      childCode: "RD002",
      ageGroup: "3-4 years",
      dietaryRequirements: [],
      mealType: "Lunch",
      status: "in-progress",
      priority: "medium",
      packingTime: "10:30 AM"
    },
    {
      id: "SN001",
      nursery: "Sunshine Nursery",
      class: "Starlight Room",
      childName: "Sophie Klein",
      childCode: "SN001",
      ageGroup: "4-5 years",
      dietaryRequirements: ["Dairy-Free", "Nut-Free"],
      mealType: "Lunch",
      status: "pending",
      priority: "high",
      packingTime: "11:00 AM"
    },
    {
      id: "LE001",
      nursery: "Little Explorers",
      class: "Discovery Class",
      childName: "Oliver Peterson",
      childCode: "LE001",
      ageGroup: "2-3 years",
      dietaryRequirements: ["Vegetarian"],
      mealType: "Lunch",
      status: "packed",
      priority: "low",
      packingTime: "11:30 AM"
    },
    {
      id: "BB001",
      nursery: "Blossom Babes",
      class: "Class A2",
      childName: "Zara Ali",
      childCode: "BB001",
      ageGroup: "3-4 years",
      dietaryRequirements: ["Vegetarian", "Gluten-Free"],
      mealType: "Lunch",
      status: "pending",
      priority: "medium",
      packingTime: "10:45 AM"
    }
  ];

  const filteredItems = items.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (searchQuery && !item.childName.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.childCode.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.nursery.toLowerCase().includes(searchQuery.toLowerCase())) 
      return false;
    return true;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="flex items-center gap-1"><Package2 className="h-3 w-3" /> In Progress</Badge>;
      case 'packed':
        return <Badge variant="outline" className="flex items-center gap-1 bg-green-100 text-green-800"><Check className="h-3 w-3" /> Packed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5" />
              Child Meal Packing Queue
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>For {format(date, 'PPPP')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search child or nursery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select defaultValue={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child Details</TableHead>
                <TableHead>Nursery & Class</TableHead>
                <TableHead>Dietary Requirements</TableHead>
                <TableHead>Meal Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Baby className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{item.childName}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.childCode} • {item.ageGroup}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{item.nursery}</div>
                        <div className="text-xs text-muted-foreground">{item.class}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.dietaryRequirements.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {item.dietaryRequirements.map((diet, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-muted-foreground" />
                      {item.mealType}
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleViewLabelPreview(item)}
                      >
                        <Tag className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8"
                        onClick={() => handlePrintLabel(item.id, item.childName)}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="h-8"
                        disabled={item.status === 'packed'}
                        onClick={() => handleMarkPacked(item.id, item.childName)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Pack
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {showLabelPreview && selectedChild && (
        <MealLabelPreview 
          child={selectedChild} 
          onClose={() => setShowLabelPreview(false)}
          onPrint={() => {
            handlePrintLabel(selectedChild.id, selectedChild.childName);
            setShowLabelPreview(false);
          }}
        />
      )}
    </>
  );
}
