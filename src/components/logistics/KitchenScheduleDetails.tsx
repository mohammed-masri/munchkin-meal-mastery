
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Clock, CalendarDays, Users, AlertTriangle, UtensilsCrossed } from 'lucide-react';

interface KitchenScheduleDetailsProps {
  date: Date;
}

export function KitchenScheduleDetails({ date }: KitchenScheduleDetailsProps) {
  // This would come from your API based on the selected date
  const schedule = {
    date: date,
    totalChildren: 180,
    totalMeals: 540,
    specialDiets: 26,
    timings: [
      {
        mealType: "Breakfast",
        preparationTime: "6:00 AM",
        servingTime: "7:30 AM",
        staffRequired: 3,
        status: "completed"
      },
      {
        mealType: "Lunch",
        preparationTime: "9:00 AM",
        servingTime: "11:30 AM",
        staffRequired: 5,
        status: "in-progress"
      },
      {
        mealType: "Snack",
        preparationTime: "1:00 PM",
        servingTime: "2:30 PM",
        staffRequired: 2,
        status: "scheduled"
      }
    ],
    instructions: "Ensure all food is prepared according to portion sizes for different age groups. Special attention to allergen control required today."
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-gray-100">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Kitchen Production Schedule
            </CardTitle>
            <CardDescription>
              Detailed schedule for {format(schedule.date, 'PPPP')}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{schedule.totalChildren} children</span>
            </div>
            <div className="flex items-center gap-1">
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{schedule.totalMeals} meals</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm">{schedule.specialDiets} special diets</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {schedule.timings.map((meal, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{meal.mealType}</h3>
                      {getStatusBadge(meal.status)}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Preparation</span>
                        </div>
                        <span className="font-medium">{meal.preparationTime}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Serving</span>
                        </div>
                        <span className="font-medium">{meal.servingTime}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Staff Required</span>
                        </div>
                        <span className="font-medium">{meal.staffRequired}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="p-4 border rounded-md bg-amber-50">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800">Special Instructions</h4>
                <p className="text-sm text-amber-700 mt-1">{schedule.instructions}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
