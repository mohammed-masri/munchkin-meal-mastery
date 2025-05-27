
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, BarChart2, TrendingUp } from 'lucide-react';

// Sample data - in a real app this would come from API or database
const nutritionData = [
  { nutrient: 'Protein', actual: 25, recommended: 30 },
  { nutrient: 'Carbs', actual: 55, recommended: 50 },
  { nutrient: 'Fiber', actual: 10, recommended: 15 },
  { nutrient: 'Calcium', actual: 28, recommended: 30 },
  { nutrient: 'Iron', actual: 22, recommended: 25 },
  { nutrient: 'Vitamin A', actual: 45, recommended: 40 },
  { nutrient: 'Vitamin C', actual: 35, recommended: 30 },
];

const trendData = [
  { month: 'Jan', protein: 22, carbs: 52, fiber: 8 },
  { month: 'Feb', protein: 23, carbs: 53, fiber: 9 },
  { month: 'Mar', protein: 24, carbs: 54, fiber: 9 },
  { month: 'Apr', protein: 25, carbs: 55, fiber: 10 },
  { month: 'May', protein: 26, carbs: 54, fiber: 11 },
  { month: 'Jun', protein: 27, carbs: 53, fiber: 12 },
];

const chartConfig = {
  actual: { 
    theme: { light: '#3b82f6', dark: '#60a5fa' },
    label: 'Actual',
  },
  recommended: { 
    theme: { light: '#e5e7eb', dark: '#374151' },
    label: 'Recommended',
  },
  protein: {
    theme: { light: '#3b82f6', dark: '#60a5fa' },
    label: 'Protein',
  },
  carbs: {
    theme: { light: '#f97316', dark: '#fb923c' }, 
    label: 'Carbohydrates',
  },
  fiber: {
    theme: { light: '#22c55e', dark: '#4ade80' },
    label: 'Fiber',
  },
};

export function NutritionalAnalytics() {
  const [isPredicting, setIsPredicting] = React.useState(false);
  
  const predictFutureValues = () => {
    setIsPredicting(true);
    // In a real app, this would call an API or ML model
    setTimeout(() => {
      setIsPredicting(false);
    }, 1500);
  };

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg md:text-xl">Nutritional Analysis</CardTitle>
            </div>
            <Badge variant="outline" className="bg-primary/10 self-start sm:self-center">AI-Powered</Badge>
          </div>
          <CardDescription className="text-sm md:text-base">
            Comparing actual vs recommended daily values for children age 3-5
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-72 lg:h-80 w-full overflow-hidden">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutritionData} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="nutrient" 
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Bar dataKey="actual" name="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recommended" name="recommended" fill="var(--color-recommended)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg md:text-xl">Predictive Trends</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={predictFutureValues}
              disabled={isPredicting}
              className="self-start sm:self-center"
            >
              {isPredicting ? 'Predicting...' : 'Predict Next Quarter'}
            </Button>
          </div>
          <CardDescription className="text-sm md:text-base">
            Nutrition trend analysis and future predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-72 lg:h-80 w-full overflow-hidden">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={trendData} 
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Bar dataKey="protein" name="protein" fill="var(--color-protein)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="carbs" name="carbs" fill="var(--color-carbs)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fiber" name="fiber" fill="var(--color-fiber)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
