
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Talabat palette
const talabatOrange = '#FF6900';
const talabatDark = '#333333';

export function AttendanceOverview() {
  // Modified data to only include total attendance (present)
  const data = [
    { ageGroup: '0-1 yr', total: 18 },
    { ageGroup: '1-2 yr', total: 36 },
    { ageGroup: '2-3 yr', total: 42 },
    { ageGroup: '3-4 yr', total: 56 },
    { ageGroup: '4-5 yr', total: 35 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance by Age Group</CardTitle>
        <CardDescription>
          Today's attendance breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
              <XAxis dataKey="ageGroup" tick={{ fill: talabatDark, fontWeight: 500 }} axisLine={{ stroke: '#E0E0E0' }} tickLine={false} />
              <YAxis tick={{ fill: talabatDark, fontWeight: 500 }} axisLine={{ stroke: '#E0E0E0' }} tickLine={false} />
              <Tooltip 
                contentStyle={{
                  borderRadius: '8px',
                  border: `1px solid ${talabatOrange}`,
                  background: '#FFF',
                  color: talabatDark,
                  fontWeight: 500,
                  boxShadow: `0 6px 32px 0 rgba(255,105,0,0.15)`,
                }}
                labelStyle={{ color: talabatOrange, fontWeight: 700 }}
                formatter={(value) => [
                  value, 
                  <span style={{ color: talabatOrange, fontWeight: 600 }}>Total</span>
                ]}
              />
              <Bar 
                dataKey="total"
                name="Total"
                fill={talabatOrange}
                radius={[8, 8, 0, 0]}
                barSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
