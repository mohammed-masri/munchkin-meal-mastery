
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Route, Plus } from "lucide-react";

export function AddRouteSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Route
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Add New Route</SheetTitle>
          <SheetDescription>
            Create a new delivery route with assigned nurseries and estimated timings.
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="route-name">Route Name</Label>
            <Input id="route-name" placeholder="e.g., North Route" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="estimated-time">Estimated Time</Label>
            <Input id="estimated-time" placeholder="e.g., 45 mins" />
          </div>
          
          <div className="grid gap-2">
            <Label>Assigned Nurseries</Label>
            <div className="grid gap-2">
              {['Sunshine Nursery', 'Rainbow Daycare'].map((nursery) => (
                <div key={nursery} className="flex items-center gap-2 p-2 border rounded-lg">
                  <Route className="h-4 w-4" />
                  <span>{nursery}</span>
                </div>
              ))}
              <Button variant="outline" className="mt-2">
                <Plus className="mr-2 h-4 w-4" />
                Add Nursery
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button>Save Route</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
