
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Truck, Clock, Info, CalendarDays, Check, PackageCheck as Package2 } from 'lucide-react';
import { format } from 'date-fns';

interface DeliveryStatusProps {
  date: Date;
}

export function DeliveryStatus({ date }: DeliveryStatusProps) {
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
      status: "pending",
      driver: "Pending",
      route: "South Route",
      specialDiets: 5,
      estimatedDelivery: "11:30 AM"
    }
  ];

  const getStatusCount = (status) => {
    return deliveries.filter(delivery => delivery.status === status).length;
  };

  const totalDeliveries = deliveries.length;
  const deliveredCount = getStatusCount('delivered');
  const inTransitCount = getStatusCount('in-transit');
  const readyCount = getStatusCount('ready');
  const pendingCount = getStatusCount('pending');

  return (
    <Card className="bg-white border-primary/10 shadow-sm">
      <CardHeader className="border-b border-primary/10">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Truck className="h-5 w-5" />
          Delivery Overview
        </CardTitle>
        <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>For {format(date, 'PPPP')}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-primary">Total Deliveries</p>
              <h3 className="text-3xl font-bold text-primary">{totalDeliveries}</h3>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {totalDeliveries}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-success">Delivered</p>
              <h3 className="text-3xl font-bold text-success">{deliveredCount}</h3>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success flex items-center gap-1">
              <Check className="h-3 w-3" />
              {deliveredCount}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-warning">In Transit</p>
              <h3 className="text-3xl font-bold text-warning">{inTransitCount}</h3>
            </div>
            <Badge variant="outline" className="bg-warning/10 text-warning flex items-center gap-1">
              <Truck className="h-3 w-3" />
              {inTransitCount}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-info/10">
            <div className="space-y-1">
              <p className="text-lg font-semibold text-info">Ready</p>
              <h3 className="text-3xl font-bold text-info">{readyCount}</h3>
            </div>
            <Badge variant="outline" className="bg-info/10 text-info flex items-center gap-1">
              <Package2 className="h-3 w-3" />
              {readyCount}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
