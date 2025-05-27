
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function UpcomingMenuPreview() {
  const mealTypes = ['Breakfast', 'Lunch', 'Snack'];
  
  // Mock data for weekly menu
  const weekDays = [
    { 
      day: 'Monday', 
      meals: {
        Breakfast: {
          title: 'Oatmeal with Berries',
          tags: ['High Fiber', 'Low Sugar']
        },
        Lunch: {
          title: 'Veggie Pasta Bake',
          tags: ['Vegetarian', 'High Protein']
        },
        Snack: {
          title: 'Apple Slices with Yogurt',
          tags: ['Fruit', 'Dairy']
        }
      }
    },
    { 
      day: 'Tuesday', 
      meals: {
        Breakfast: {
          title: 'Whole Grain Toast with Avocado',
          tags: ['Whole Grain', 'Healthy Fats']
        },
        Lunch: {
          title: 'Chicken and Rice Bowl',
          tags: ['High Protein', 'Gluten Free']
        },
        Snack: {
          title: 'Carrot Sticks with Hummus',
          tags: ['Vegetable', 'Protein']
        }
      }
    },
    { 
      day: 'Wednesday', 
      meals: {
        Breakfast: {
          title: 'Yogurt Parfait',
          tags: ['Calcium', 'Probiotics']
        },
        Lunch: {
          title: 'Fish Fingers with Sweet Potato Mash',
          tags: ['Omega-3', 'Vitamin A']
        },
        Snack: {
          title: 'Banana and Milk',
          tags: ['Potassium', 'Calcium']
        }
      }
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-foreground">Weekly Menu Preview</CardTitle>
          <CardDescription className="text-foreground">
            Upcoming meals for this week
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View Full Menu
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Breakfast">
          <TabsList className="grid grid-cols-3 mb-4">
            {mealTypes.map(type => (
              <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
            ))}
          </TabsList>
          
          {mealTypes.map(type => (
            <TabsContent key={type} value={type} className="pt-2">
              <div className="space-y-4">
                {weekDays.map((day, index) => (
                  <div key={index} className="pb-3 border-b last:border-0">
                    <div className="font-medium text-sm text-foreground mb-1">
                      {day.day}
                    </div>
                    <div className="font-medium mb-1 text-foreground">
                      {day.meals[type as keyof typeof day.meals].title}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {day.meals[type as keyof typeof day.meals].tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
