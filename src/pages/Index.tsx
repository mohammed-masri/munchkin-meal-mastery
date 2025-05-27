
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MealSummaryCard } from '@/components/dashboard/MealSummaryCard';
import { NurseryMealStats } from '@/components/dashboard/NurseryMealStats';
import { AttendanceOverview } from '@/components/dashboard/AttendanceOverview';
import { UpcomingMenuPreview } from '@/components/dashboard/UpcomingMenuPreview';
import { NutritionAlerts } from '@/components/dashboard/NutritionAlerts';
import { Calendar, Clock, BarChart3, AlertTriangle } from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of today's meals and nutrition data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar size={14} />
              <span>Monday, April 18, 2025</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
              <Clock size={14} />
              <span>Cut-off time: 9:30 AM</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MealSummaryCard 
            title="Today's Meals"
            description="Total meals across all nurseries"
            count={187}
            breakdown={[
              { label: 'Breakfast', value: 42 },
              { label: 'Lunch', value: 98 },
              { label: 'Snack', value: 47 }
            ]}
          />
          
          <MealSummaryCard 
            title="Dietary Restrictions"
            description="Special diet and allergy meals"
            count={24}
            breakdown={[
              { label: 'Allergies', value: 15 },
              { label: 'Vegetarian', value: 7 },
              { label: 'Other', value: 2 }
            ]}
          />
          
          <MealSummaryCard 
            title="Attendance Status"
            description="Children present today"
            count={218}
            breakdown={[
              { label: 'Present', value: 187 },
              { label: 'Absent', value: 31 },
              { label: 'Pending', value: 0 }
            ]}
          />
        </div>
        
        <Tabs defaultValue="overview" className="mt-2">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nurseries">Nurseries</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AttendanceOverview />
              <UpcomingMenuPreview />
            </div>
          </TabsContent>
          
          <TabsContent value="nurseries" className="mt-4">
            <NurseryMealStats />
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-4">
            <NutritionAlerts />
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Recent Updates</CardTitle>
                <CardDescription className="text-foreground">Latest meal system activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View all
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-1 bg-primary/10">
                    <AlertTriangle size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">New dietary restriction added</p>
                    <p className="text-sm text-muted-foreground">Sammy Johnson (Sunshine Room) now has egg allergy</p>
                    <p className="text-xs text-muted-foreground mt-1">15 min ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-1 bg-secondary/10">
                    <BarChart3 size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Weekly menu published</p>
                    <p className="text-sm text-muted-foreground">Next week menu has been published and sent to parents</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-1 bg-accent/10">
                    <Calendar size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Attendance updated</p>
                    <p className="text-sm text-muted-foreground">Rainbow Nursery has updated attendance for today</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription className="text-foreground">Frequently used tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  Update today's attendance
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  View meal production summary
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Record meal feedback
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Send parent notifications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Generate nutrition report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
