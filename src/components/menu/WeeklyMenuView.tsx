
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MenuItem } from '@/types/menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const mealTypes = ['Breakfast', 'Lunch', 'Snack'];

export function WeeklyMenuView({ 
  availableMenuItems,
  onSaveAsTemplate 
}: { 
  availableMenuItems: MenuItem[];
  onSaveAsTemplate?: (slots: Record<string, Record<string, MenuItem | null>>) => void;
}) {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false);
  const [weeklyMenu, setWeeklyMenu] = useState<Record<string, Record<string, MenuItem | null>>>({
    Monday: { Breakfast: null, Lunch: null, Snack: null },
    Tuesday: { Breakfast: null, Lunch: null, Snack: null },
    Wednesday: { Breakfast: null, Lunch: null, Snack: null },
    Thursday: { Breakfast: null, Lunch: null, Snack: null },
    Friday: { Breakfast: null, Lunch: null, Snack: null },
  });

  // Debug any changes to the weekly menu
  useEffect(() => {
    console.log("WeeklyMenuView - Weekly menu updated:", Object.keys(weeklyMenu).flatMap(day => 
      Object.entries(weeklyMenu[day])
        .filter(([_, item]) => item !== null)
        .map(([mealType]) => `${day}-${mealType}`)
    ));
  }, [weeklyMenu]);

  const filteredItems = availableMenuItems.filter(item => 
    item.mealType === selectedMealType
  );

  const openAddItemDialog = (day: string, mealType: string) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setIsAddItemOpen(true);
  };

  const addItemToMenu = (item: MenuItem) => {
    console.log(`WeeklyMenuView - Adding ${item.name} to ${selectedDay}'s ${selectedMealType}`);
    const updatedMenu = {
      ...weeklyMenu,
      [selectedDay]: {
        ...weeklyMenu[selectedDay],
        [selectedMealType]: item
      }
    };
    
    setWeeklyMenu(updatedMenu);
    setIsAddItemOpen(false);
    
    toast({
      title: "Menu Item Added",
      description: `${item.name} added to ${selectedDay}'s ${selectedMealType}`
    });
  };

  const removeItemFromMenu = (day: string, mealType: string) => {
    console.log(`WeeklyMenuView - Removing item from ${day}'s ${mealType}`);
    const updatedMenu = {
      ...weeklyMenu,
      [day]: {
        ...weeklyMenu[day],
        [mealType]: null
      }
    };
    
    setWeeklyMenu(updatedMenu);
    
    toast({
      title: "Menu Item Removed",
      description: `Item removed from ${day}'s ${mealType}`
    });
  };

  const handleSaveAsTemplate = () => {
    if (onSaveAsTemplate) {
      console.log("WeeklyMenuView - Saving menu as template");
      
      // Create a deep copy of the current weekly menu
      const menuCopy = JSON.parse(JSON.stringify(weeklyMenu));
      
      // Call the callback directly, no timeout
      onSaveAsTemplate(menuCopy);
      
      toast({
        title: "Template Saved",
        description: "Menu template has been created successfully."
      });
    } else {
      console.error("onSaveAsTemplate callback is not defined");
      toast({
        title: "Error",
        description: "Failed to save template. Please try again.",
        variant: "destructive"
      });
    }
  };

  const clearAllMenuItems = () => {
    const emptyMenu = {
      Monday: { Breakfast: null, Lunch: null, Snack: null },
      Tuesday: { Breakfast: null, Lunch: null, Snack: null },
      Wednesday: { Breakfast: null, Lunch: null, Snack: null },
      Thursday: { Breakfast: null, Lunch: null, Snack: null },
      Friday: { Breakfast: null, Lunch: null, Snack: null },
    };
    
    setWeeklyMenu(emptyMenu);
    
    toast({
      title: "Menu Cleared",
      description: "All menu items have been removed."
    });
  };

  console.log("WeeklyMenuView - Rendering with items count:", availableMenuItems.length);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Weekly Menu Plan</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={clearAllMenuItems}
            size="sm"
          >
            Clear All
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSaveAsTemplate}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>
      
      <Card className="bg-background shadow-sm border">
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-4">
            {/* Time slots column */}
            <div className="col-span-1">
              <div className="h-16" /> {/* Spacer for alignment with day headers */}
              {mealTypes.map((type) => (
                <div key={type} className="h-32 flex items-center">
                  <span className="text-sm font-medium text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
            
            {/* Days columns */}
            {daysOfWeek.map((day) => (
              <div key={day} className="col-span-1">
                <div className="h-16 flex items-center justify-center">
                  <span className="font-medium">{day}</span>
                </div>
                {mealTypes.map((type) => (
                  <div
                    key={`${day}-${type}`} 
                    className="mb-4 h-32"
                  >
                    <Card className="h-full hover:shadow-md transition-all duration-200 border border-gray-200">
                      <div className="p-3 h-full">
                        {weeklyMenu[day][type] ? (
                          <div className="flex h-full items-center p-2">
                            <div className="flex items-center gap-3 w-full">
                              <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={weeklyMenu[day][type]!.image} 
                                  alt={weeklyMenu[day][type]!.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">
                                  {weeklyMenu[day][type]!.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {weeklyMenu[day][type]!.nutritionTags.slice(0, 2).join(', ')}
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0"
                                onClick={() => removeItemFromMenu(day, type)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            className="w-full h-full flex flex-col items-center justify-center gap-1"
                            onClick={() => openAddItemDialog(day, type)}
                          >
                            <Plus className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Add Item</span>
                          </Button>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog for adding menu items */}
      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add {selectedMealType} for {selectedDay}
            </DialogTitle>
            <DialogDescription>
              Select a menu item to add to this slot
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <h4 className="font-medium">Available {selectedMealType} Items:</h4>
            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <Button 
                    key={item.id} 
                    variant="outline" 
                    className="justify-start text-left h-auto py-2"
                    onClick={() => addItemToMenu(item)}
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.nutritionTags.slice(0, 3).join(', ')}
                        {item.nutritionTags.length > 3 ? '...' : ''}
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No {selectedMealType} items available. Create new menu items first.
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
