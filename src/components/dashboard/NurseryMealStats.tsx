
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PackageCheck, AlertTriangle } from 'lucide-react';

export function NurseryMealStats() {
  // Mock data for nursery meal stats
  const nurseries = [
    {
      id: 1,
      name: 'Al Badee Nursery',
      totalMeals: 42,
      status: 'confirmed',
      specialDiets: 5,
      breakfast: 10,
      lunch: 22,
      snack: 10
    },
    {
      id: 2,
      name: 'Al Qulayaa Nursery',
      totalMeals: 36,
      status: 'confirmed',
      specialDiets: 3,
      breakfast: 8,
      lunch: 20,
      snack: 8
    },
    {
      id: 3,
      name: 'Al Rahmaniya Nursery',
      totalMeals: 51,
      status: 'pending',
      specialDiets: 7,
      breakfast: 12,
      lunch: 26,
      snack: 13
    },
    {
      id: 4,
      name: 'Maleha Nursery',
      totalMeals: 29,
      status: 'confirmed',
      specialDiets: 4,
      breakfast: 6,
      lunch: 16,
      snack: 7
    },
    {
      id: 5,
      name: 'Kalba Nursery',
      totalMeals: 29,
      status: 'confirmed',
      specialDiets: 5,
      breakfast: 6,
      lunch: 14,
      snack: 9
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nursery Meal Distribution</CardTitle>
        <CardDescription>
          Today's meal count breakdown by nursery location
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nursery</TableHead>
              <TableHead className="text-right">Total Meals</TableHead>
              <TableHead className="text-right">Breakfast</TableHead>
              <TableHead className="text-right">Lunch</TableHead>
              <TableHead className="text-right">Snack</TableHead>
              <TableHead className="text-right">Special Diets</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nurseries.map(nursery => (
              <TableRow key={nursery.id}>
                <TableCell className="font-medium">{nursery.name}</TableCell>
                <TableCell className="text-right">{nursery.totalMeals}</TableCell>
                <TableCell className="text-right">{nursery.breakfast}</TableCell>
                <TableCell className="text-right">{nursery.lunch}</TableCell>
                <TableCell className="text-right">{nursery.snack}</TableCell>
                <TableCell className="text-right">{nursery.specialDiets}</TableCell>
                <TableCell>
                  {nursery.status === 'confirmed' ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex w-fit items-center gap-1">
                      <PackageCheck size={12} />
                      <span>Confirmed</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-amber-500 text-amber-500 flex w-fit items-center gap-1">
                      <AlertTriangle size={12} />
                      <span>Pending</span>
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
