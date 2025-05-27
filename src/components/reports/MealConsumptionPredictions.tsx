
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Brain, BarChart2, LineChart as LineChartIcon, AlertTriangle } from 'lucide-react';

// Sample data - in a real app this would come from API or database
const consumptionData = [
  { week: 'Week 1', actual: 92, predicted: 90 },
  { week: 'Week 2', actual: 88, predicted: 89 },
  { week: 'Week 3', actual: 91, predicted: 90 },
  { week: 'Week 4', actual: 93, predicted: 92 },
  { week: 'Week 5', actual: 90, predicted: 91 },
  { week: 'Week 6', actual: 89, predicted: 88 },
  { week: 'Week 7', actual: null, predicted: 86 },
  { week: 'Week 8', actual: null, predicted: 85 },
];

const wasteRiskItems = [
  { id: 1, name: 'Spinach Pasta', risk: 'High', reason: 'Low consumption trend' },
  { id: 2, name: 'Carrot Muffins', risk: 'Medium', reason: 'Seasonal preference change' },
  { id: 3, name: 'Veggie Soup', risk: 'Medium', reason: 'Weather getting warmer' },
];

const chartConfig = {
  actual: { 
    theme: { light: '#3b82f6', dark: '#60a5fa' },
    label: 'Actual',
  },
  predicted: { 
    theme: { light: '#f97316', dark: '#fb923c' },
    label: 'Predicted',
  },
};

export function MealConsumptionPredictions() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg md:text-xl">Meal Consumption Predictions</CardTitle>
          </div>
          <CardDescription className="text-sm md:text-base">
            Predicted consumption rates vs actual consumption rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-72 lg:h-80 w-full overflow-hidden">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consumptionData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis domain={[75, 100]} tick={{ fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="actual" 
                    stroke="var(--color-actual)" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    name="predicted" 
                    stroke="var(--color-predicted)" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ r: 4 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex justify-center mt-4">
            <Badge className="bg-primary/10 text-primary text-xs md:text-sm">
              Predicted Consumption Next Month: 86%
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <CardTitle className="text-lg md:text-xl">Waste Risk Analysis</CardTitle>
          </div>
          <CardDescription className="text-sm md:text-base">
            AI-powered food waste risk predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm min-w-[120px]">Menu Item</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[100px]">Risk Level</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[150px]">Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wasteRiskItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-xs md:text-sm">{item.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.risk === 'High' ? 'destructive' : 'outline'}
                        className={`text-xs ${item.risk === 'Medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}`}
                      >
                        {item.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">{item.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
