
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Printer, Package2, School, UtensilsCrossed, CheckSquare, Info, AlertTriangle } from 'lucide-react';

interface ContainerLabelProps {
  container: {
    id: string;
    nursery: string;
    className: string;
    ageGroup: string;
    mealType: string;
    totalMeals: number;
    regularMeals: number;
    specialDiets: { type: string; count: number }[];
  };
  onClose: () => void;
  onPrint: () => void;
}

export function ContainerLabelPreview({ container, onClose, onPrint }: ContainerLabelProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            Container Label Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border rounded-lg bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Container Summary – {container.mealType}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                Nursery: <span className="font-medium">{container.nursery}</span> | 
                Class: <span className="font-medium">{container.className}</span> ({container.ageGroup})
              </p>
            </div>
            
            <div className="border-t pt-2">
              <p className="font-medium">Total Meals: {container.totalMeals}</p>
              <ul className="mt-1 space-y-1 text-sm">
                <li className="flex items-center gap-1">
                  <UtensilsCrossed className="h-3 w-3 text-muted-foreground" />
                  {container.regularMeals} Regular
                </li>
                {container.specialDiets.map((diet, idx) => (
                  <li key={idx} className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    {diet.count} {diet.type}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-green-50 text-green-800 rounded-md text-sm">
              <CheckSquare className="h-4 w-4" />
              <p>✓ Individually labelled meals enclosed.</p>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              Container ID: {container.id} | Date: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button type="button" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <Button type="button" onClick={onPrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Label
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
