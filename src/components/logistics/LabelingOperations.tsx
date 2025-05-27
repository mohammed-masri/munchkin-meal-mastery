
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag, Printer, AlertTriangle, Search, Check, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LabelingOperations() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handlePrintLabel = (nurseryName: string) => {
    toast({
      title: "Printing Labels",
      description: `Printing labels for ${nurseryName}`,
    });
  };

  const items = [
    {
      nursery: "Rainbow Daycare",
      meals: 36,
      specialDiets: [
        { type: "Gluten-Free", count: 2 },
        { type: "Dairy-Free", count: 1 }
      ],
      isPacked: true,
      isLabeled: false,
      deliveryTime: "10:30 AM"
    },
    {
      nursery: "Sunshine Nursery",
      meals: 42,
      specialDiets: [
        { type: "Nut-Free", count: 3 },
        { type: "Vegetarian", count: 1 }
      ],
      isPacked: true,
      isLabeled: false,
      deliveryTime: "11:00 AM"
    },
    {
      nursery: "Little Explorers",
      meals: 28,
      specialDiets: [
        { type: "Dairy-Free", count: 2 }
      ],
      isPacked: true,
      isLabeled: true,
      deliveryTime: "11:30 AM"
    },
    {
      nursery: "Growing Minds",
      meals: 35,
      specialDiets: [
        { type: "Gluten-Free", count: 3 },
        { type: "Vegan", count: 2 }
      ],
      isPacked: true,
      isLabeled: false,
      deliveryTime: "10:45 AM"
    }
  ];

  const filteredItems = items.filter(item => {
    if (filterStatus === 'labeled' && !item.isLabeled) return false;
    if (filterStatus === 'unlabeled' && item.isLabeled) return false;
    if (searchQuery && !item.nursery.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Label Generation
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[180px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search nursery..."
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
              <SelectItem value="labeled">Labeled</SelectItem>
              <SelectItem value="unlabeled">Unlabeled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nursery</TableHead>
              <TableHead>Total Meals</TableHead>
              <TableHead>Special Requirements</TableHead>
              <TableHead>Delivery Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.nursery}>
                <TableCell className="font-medium">{item.nursery}</TableCell>
                <TableCell>{item.meals}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.specialDiets.map((diet, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {diet.type} ({diet.count})
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{item.deliveryTime}</TableCell>
                <TableCell>
                  {item.isLabeled ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800">Labeled</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">Ready for Labeling</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      disabled={item.isLabeled}
                      onClick={() => handlePrintLabel(item.nursery)}
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print Labels
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8"
                      disabled={item.isLabeled}
                      onClick={() => toast({
                        title: "Labels Applied",
                        description: `${item.nursery} order has been labeled`,
                      })}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Mark Labeled
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
