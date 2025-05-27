
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Check, Clock, ScanLine, Search, Filter, Package2, AlertTriangle, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

interface DeliveryOperationsProps {
  date: Date;
}

export function DeliveryOperations({ date }: DeliveryOperationsProps) {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleMarkDelivered = (nurseryName: string) => {
    toast({
      title: "Delivery Complete",
      description: `Order delivered to ${nurseryName}`,
    });
  };

  const deliveries = [
    {
      nursery: "Rainbow Daycare",
      meals: 36,
      address: "123 Rainbow Lane",
      status: "in-transit",
      driver: "John Smith",
      route: "North Route",
      specialDiets: 3,
      estimatedDelivery: "10:30 AM"
    },
    {
      nursery: "Sunshine Nursery",
      meals: 42,
      address: "456 Sunshine Road",
      status: "ready",
      driver: "Pending",
      route: "East Route",
      specialDiets: 4,
      estimatedDelivery: "11:00 AM"
    },
    {
      nursery: "Little Explorers",
      meals: 28,
      address: "789 Explorer Avenue",
      status: "delivered",
      driver: "Maria Garcia",
      route: "West Route",
      specialDiets: 2,
      estimatedDelivery: "9:45 AM"
    },
    {
      nursery: "Growing Minds",
      meals: 35,
      address: "101 Growth Street",
      status: "ready",
      driver: "Pending",
      route: "South Route",
      specialDiets: 5,
      estimatedDelivery: "11:30 AM"
    }
  ];

  const filteredDeliveries = deliveries.filter(delivery => {
    if (filterStatus !== 'all' && delivery.status !== filterStatus) return false;
    if (searchQuery && !delivery.nursery.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ready':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 flex items-center gap-1">
          <Package2 className="h-3 w-3" />
          Ready
        </Badge>;
      case 'in-transit':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 flex items-center gap-1">
          <Truck className="h-3 w-3" />
          In Transit
        </Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
          <Check className="h-3 w-3" />
          Delivered
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery Management
          </CardTitle>
          <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>For {format(date, 'PPPP')}</span>
          </div>
        </div>
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
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nursery</TableHead>
              <TableHead>Meals</TableHead>
              <TableHead>Special Diets</TableHead>
              <TableHead>Route / Driver</TableHead>
              <TableHead>Delivery Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeliveries.map((delivery) => (
              <TableRow key={delivery.nursery}>
                <TableCell className="font-medium">
                  <div>
                    {delivery.nursery}
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {delivery.address}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{delivery.meals}</TableCell>
                <TableCell>
                  {delivery.specialDiets > 0 ? (
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                      {delivery.specialDiets}
                    </div>
                  ) : '0'}
                </TableCell>
                <TableCell>
                  <div>
                    {delivery.route}
                    <div className="text-xs text-muted-foreground mt-1">
                      {delivery.driver}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {delivery.estimatedDelivery}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      disabled={delivery.status === 'delivered'}
                      onClick={() => toast({
                        title: "Scan Delivery",
                        description: "Please scan the delivery QR code",
                      })}
                    >
                      <ScanLine className="h-4 w-4 mr-2" />
                      Scan
                    </Button>
                    <Button
                      variant={delivery.status === 'in-transit' ? 'default' : 'outline'}
                      size="sm"
                      className="h-8"
                      disabled={delivery.status !== 'in-transit'}
                      onClick={() => handleMarkDelivered(delivery.nursery)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {delivery.status === 'ready' ? 'Dispatch' : 'Delivered'}
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
