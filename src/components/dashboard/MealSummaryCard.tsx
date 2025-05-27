
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MealBreakdown {
  label: string;
  value: number;
}

interface MealSummaryCardProps {
  title: string;
  description: string;
  count: number;
  breakdown: MealBreakdown[];
}

export function MealSummaryCard({ title, description, count, breakdown }: MealSummaryCardProps) {
  // Calculate total to determine percentages
  const total = breakdown.reduce((acc, item) => acc + item.value, 0);
  
  // Color mapping for different card types
  const colorMap: Record<string, string> = {
    "Today's Meals": 'text-primary',
    "Dietary Restrictions": 'text-highlight',
    "Attendance Status": 'text-secondary'
  };
  
  const textColor = colorMap[title] || 'text-primary';
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4 mt-2">
          <span className={`${textColor}`}>{count}</span>
        </div>
        <div className="space-y-3">
          {breakdown.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-foreground/80">
                <span>{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <Progress 
                value={(item.value / total) * 100} 
                className={`h-2 ${index === 0 ? 'bg-primary/20' : index === 1 ? 'bg-secondary/20' : 'bg-accent/20'}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
