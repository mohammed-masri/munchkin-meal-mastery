
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, X, Printer, Baby, School, UtensilsCrossed, AlertTriangle } from 'lucide-react';

interface MealLabelProps {
  child: {
    childName: string;
    nursery: string;
    class: string;
    ageGroup: string;
    mealType: string;
    dietaryRequirements: string[];
  };
  onClose: () => void;
  onPrint: () => void;
}

export function MealLabelPreview({ child, onClose, onPrint }: MealLabelProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Meal Label Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-4 border rounded-lg bg-white">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">{child.childName}</h3>
              </div>
              <QrCode className="h-16 w-16 p-1 border rounded" />
            </div>
            
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                {child.nursery} – {child.class} (Age {child.ageGroup})
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">Meal Type: <span className="font-medium">{child.mealType}</span></p>
            </div>
            
            {child.dietaryRequirements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {child.dietaryRequirements.map((diet, idx) => (
                  <Badge key={idx} variant="outline" className="flex items-center gap-1 py-1">
                    <AlertTriangle className="h-3 w-3" />
                    {diet}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="text-xs text-muted-foreground text-center">
              ID: {child.childName.substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
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
