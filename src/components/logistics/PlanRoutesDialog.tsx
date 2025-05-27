
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Route } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddRouteSheet } from "./AddRouteSheet";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export function PlanRoutesDialog() {
  const routes = [
    {
      id: 1,
      name: "North Route",
      nurseries: ["Sunshine Nursery", "Rainbow Daycare"],
      deliveries: 2,
      estimatedTime: "45 mins",
      driver: "John Smith",
      status: "available"
    },
    {
      id: 2,
      name: "South Route",
      nurseries: ["Little Explorers", "Kids Paradise"],
      deliveries: 2,
      estimatedTime: "35 mins",
      driver: "Maria Garcia",
      status: "in-progress"
    }
  ];

  const handleDragEnd = (result: any) => {
    // Handle drag end logic here if needed
    console.log("PlanRoutesDialog - Drag ended:", result);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Route size={16} />
          Plan Routes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Delivery Routes</DialogTitle>
          <DialogDescription>
            Plan and manage delivery routes for nursery meal distribution.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Name</TableHead>
                <TableHead>Nurseries</TableHead>
                <TableHead className="text-right">Deliveries</TableHead>
                <TableHead>Est. Time</TableHead>
                <TableHead>Driver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.name}</TableCell>
                  <TableCell>{route.nurseries.join(", ")}</TableCell>
                  <TableCell className="text-right">{route.deliveries}</TableCell>
                  <TableCell>{route.estimatedTime}</TableCell>
                  <TableCell>{route.driver}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex justify-end gap-2 mt-4">
            <AddRouteSheet />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
