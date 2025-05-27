
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export function KitchenInstructions() {
  // This simulates data as if it was saved through MenuTemplates and MenuCycles
  const productionSchedule = {
    date: new Date(),
    totalChildren: 180,
    meals: [
      {
        mealType: 'Breakfast',
        time: '7:30 AM',
        items: [
          {
            name: 'Whole Grain Pancakes',
            baseQuantity: 160, // Regular servings
            specialRequirements: [
              {
                type: 'gluten-free',
                quantity: 12
              },
              {
                type: 'dairy-free',
                quantity: 8
              }
            ],
            notes: 'Prepare gluten-free batter separately. Dairy-free served with fruit syrup instead of butter.'
          },
          {
            name: 'Fresh Fruit Medley',
            baseQuantity: 180,
            specialRequirements: [],
            notes: 'Cut fruit into appropriate sizes for different age groups'
          },
          {
            name: 'Milk',
            baseQuantity: 172,
            specialRequirements: [
              {
                type: 'dairy-free',
                quantity: 8,
                alternative: 'Soy Milk'
              }
            ],
            notes: 'Serve dairy alternatives in marked pitchers'
          }
        ]
      },
      {
        mealType: 'Lunch',
        time: '11:00 AM',
        items: [
          {
            name: 'Baked Chicken with Rice',
            baseQuantity: 165,
            specialRequirements: [
              {
                type: 'vegetarian',
                quantity: 15,
                alternative: 'Garden Veggie Patty'
              }
            ],
            notes: 'Prepare rice without butter for dairy-free portions'
          },
          {
            name: 'Steamed Vegetables',
            baseQuantity: 180,
            specialRequirements: [],
            notes: 'Steam in batches to maintain freshness'
          },
          {
            name: 'Whole Grain Roll',
            baseQuantity: 168,
            specialRequirements: [
              {
                type: 'gluten-free',
                quantity: 12,
                alternative: 'Gluten-Free Roll'
              }
            ],
            notes: 'Keep gluten-free rolls separately wrapped'
          }
        ]
      },
      {
        mealType: 'Afternoon Snack',
        time: '2:30 PM',
        items: [
          {
            name: 'Apple Slices with Yogurt Dip',
            baseQuantity: 172,
            specialRequirements: [
              {
                type: 'dairy-free',
                quantity: 8,
                alternative: 'Sunflower Seed Butter'
              }
            ],
            notes: 'Slice apples just before serving. Label dairy-free portions clearly.'
          }
        ]
      }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kitchen Production Schedule</CardTitle>
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Production plan for {productionSchedule.totalChildren} children
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {productionSchedule.meals.map((meal, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{meal.mealType}</h3>
                  <p className="text-sm text-muted-foreground">Start: {meal.time}</p>
                </div>
                <Badge variant="outline">{meal.items.length} items</Badge>
              </div>
              
              <div className="space-y-4">
                {meal.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2 border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline">Base: {item.baseQuantity}</Badge>
                        {item.specialRequirements.length > 0 && (
                          <Badge variant="secondary">
                            +{item.specialRequirements.length} special
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {item.specialRequirements.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.specialRequirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="outline" className="text-xs">
                            {req.quantity}x {req.type}
                            {req.alternative && ` (${req.alternative})`}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {item.notes && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Note: {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              {index < productionSchedule.meals.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
