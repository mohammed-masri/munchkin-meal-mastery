
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Printer, Tag, School } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function BulkLabelPrinting() {
  const { toast } = useToast();
  const [selectedNurseries, setSelectedNurseries] = useState<string[]>([]);
  const [labelType, setLabelType] = useState<string>("children");

  const nurseries = [
    { id: "AB", name: "Al Badee Nursery", childCount: 36, containerCount: 4 },
    { id: "AQ", name: "Al Qulayaa Nursery", childCount: 42, containerCount: 5 },
    { id: "AR", name: "Al Rahmaniya Nursery", childCount: 28, containerCount: 3 },
    { id: "MN", name: "Maleha Nursery", childCount: 35, containerCount: 4 },
    { id: "KN", name: "Kalba Nursery", childCount: 21, containerCount: 2 }
  ];

  const handleSelectAllNurseries = () => {
    if (selectedNurseries.length === nurseries.length) {
      setSelectedNurseries([]);
    } else {
      setSelectedNurseries(nurseries.map(n => n.id));
    }
  };

  const handleSelectNursery = (id: string) => {
    if (selectedNurseries.includes(id)) {
      setSelectedNurseries(selectedNurseries.filter(n => n !== id));
    } else {
      setSelectedNurseries([...selectedNurseries, id]);
    }
  };

  const handlePrintLabels = () => {
    const nurseriesText = selectedNurseries.length === nurseries.length 
      ? "all nurseries" 
      : `${selectedNurseries.length} selected nurseries`;
    
    const labelTypeText = labelType === "children" ? "child meal labels" : "container labels";
    
    toast({
      title: "Printing Labels in Bulk",
      description: `Printing ${labelTypeText} for ${nurseriesText}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Bulk Label Printing
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Select nurseries and label type to print in bulk
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={labelType} onValueChange={setLabelType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Label Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="children">Child Meal Labels</SelectItem>
                  <SelectItem value="containers">Container Labels</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handlePrintLabels} 
                disabled={selectedNurseries.length === 0}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Selected
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedNurseries.length === nurseries.length}
                    onCheckedChange={handleSelectAllNurseries} 
                  />
                </TableHead>
                <TableHead>Nursery</TableHead>
                <TableHead>Child Labels</TableHead>
                <TableHead>Container Labels</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nurseries.map((nursery) => (
                <TableRow key={nursery.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedNurseries.includes(nursery.id)}
                      onCheckedChange={() => handleSelectNursery(nursery.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{nursery.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{nursery.childCount}</TableCell>
                  <TableCell>{nursery.containerCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
