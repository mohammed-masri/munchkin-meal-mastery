
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { MenuItem, MenuTemplate } from '@/types/menu';
import { useToast } from '@/hooks/use-toast';

interface LinkToTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem: MenuItem;
  templates: MenuTemplate[];
  onAddToTemplate: (templateId: number, day: string, mealType: string) => void;
}

export function LinkToTemplateDialog({ 
  open, 
  onOpenChange, 
  menuItem, 
  templates,
  onAddToTemplate
}: LinkToTemplateDialogProps) {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Snack'];
  
  const handleLinkToTemplate = () => {
    if (!selectedTemplate || !selectedDay || !selectedMealType) {
      toast({
        title: "Selection Required",
        description: "Please select a template, day, and meal type.",
        variant: "destructive"
      });
      return;
    }
    
    onAddToTemplate(selectedTemplate, selectedDay, selectedMealType);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Template</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select Template</h3>
            <div className="grid grid-cols-1 gap-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  type="button"
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className="justify-start text-left"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select Day</h3>
            <div className="grid grid-cols-2 gap-2">
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={selectedDay === day ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Select Meal Type</h3>
            <div className="grid grid-cols-3 gap-2">
              {mealTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedMealType === type ? "default" : "outline"}
                  onClick={() => setSelectedMealType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleLinkToTemplate}>
            Add to Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
