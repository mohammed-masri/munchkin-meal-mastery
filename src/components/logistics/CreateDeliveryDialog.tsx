
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
import { PackageCheck } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function CreateDeliveryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PackageCheck size={16} />
          Create Delivery
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Delivery</DialogTitle>
          <DialogDescription>
            Set up a new delivery for meal distribution.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nursery">Select Nursery</Label>
            <Select>
              <SelectTrigger id="nursery">
                <SelectValue placeholder="Select nursery" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunshine">Sunshine Nursery</SelectItem>
                <SelectItem value="rainbow">Rainbow Daycare</SelectItem>
                <SelectItem value="explorers">Little Explorers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="route">Delivery Route</Label>
            <Select>
              <SelectTrigger id="route">
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North Route</SelectItem>
                <SelectItem value="south">South Route</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="driver">Assign Driver</Label>
            <Select>
              <SelectTrigger id="driver">
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Smith</SelectItem>
                <SelectItem value="maria">Maria Garcia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Create Delivery</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
