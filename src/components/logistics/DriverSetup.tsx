
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Truck, UserPlus } from "lucide-react";

export function DriverSetup() {
  const drivers = [
    { id: 1, name: "John Smith", phone: "+1 234 567 8901", status: "Active" },
    { id: 2, name: "Maria Garcia", phone: "+1 234 567 8902", status: "Active" },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Driver Management</CardTitle>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {drivers.map((driver) => (
              <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {driver.phone}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Driver</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter driver's full name" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter contact number" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="license">License Number</Label>
              <Input id="license" placeholder="Enter driver's license number" />
            </div>
            
            <Button className="w-full">
              <Truck className="mr-2 h-4 w-4" />
              Register Driver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
