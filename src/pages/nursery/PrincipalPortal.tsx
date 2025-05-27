
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { School, Users, BarChart2, Utensils, Activity, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrincipalPortal = () => {
  const rooms = [
    { id: 1, name: "Sunshine Room", teacher: "Ms. Jennifer Wilson", children: 5, attendance: 4 },
    { id: 2, name: "Rainbow Room", teacher: "Mr. Thomas Brown", children: 6, attendance: 5 },
    { id: 3, name: "Star Room", teacher: "Ms. Emily Davis", children: 4, attendance: 4 },
    { id: 4, name: "Moon Room", teacher: "Mr. Robert Miller", children: 5, attendance: 3 },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <School className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Principal Portal</h1>
              <p className="text-muted-foreground">Bright Beginnings Nursery • Mrs. Sarah Thompson</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Staff
            </Button>
            <Button>
              <BarChart2 className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </div>
        </div>

        <Card className="bg-soft-orange bg-opacity-10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Today's Overview</h2>
                <p className="text-muted-foreground">Tuesday, April 18, 2025</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-xs text-muted-foreground">Classrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">20</div>
                  <div className="text-xs text-muted-foreground">Total Children</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">16</div>
                  <div className="text-xs text-muted-foreground">Present Today</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              <span>Nursery Overview</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Meal Performance</span>
            </TabsTrigger>
            <TabsTrigger value="staff" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Staff Management</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    Classroom Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rooms.map(room => (
                      <div key={room.id} className="border-b pb-3 last:border-0">
                        <div className="flex justify-between">
                          <span className="font-medium">{room.name}</span>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {room.attendance}/{room.children} Present
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Teacher: {room.teacher}
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">View Detailed Classroom Reports</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Weekly Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="text-center">
                      <div className="text-muted-foreground">Attendance Chart</div>
                      <div className="text-xs text-muted-foreground">[Placeholder for chart]</div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <div>
                      <div className="font-medium">Attendance Rate</div>
                      <div className="text-green-600">80% (+5%)</div>
                    </div>
                    <div>
                      <div className="font-medium">Meal Consumption</div>
                      <div className="text-green-600">85% (+3%)</div>
                    </div>
                    <div>
                      <div className="font-medium">Special Meals</div>
                      <div className="text-amber-600">25% (-2%)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="meals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Performance Analytics</CardTitle>
                <CardDescription>Overview of meal consumption and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {["Overall Consumption", "Vegetarian Meals", "Special Dietary", "Waste Reduction"].map((metric, idx) => (
                      <Card key={metric}>
                        <CardContent className="p-4 text-center">
                          <div className="text-sm font-medium">{metric}</div>
                          <div className="text-2xl font-bold text-primary mt-2">
                            {[85, 30, 25, 90][idx]}%
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {["+2%", "+5%", "0%", "+7%"][idx]} vs last week
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Top Performing Meals</h3>
                    <div className="space-y-2">
                      {["Veggie Pasta with Tomato Sauce", "Chicken and Rice Bowl", "Fish Fingers with Mashed Potatoes", "Fruit Salad with Yogurt"].map((meal, idx) => (
                        <div key={meal} className="flex justify-between items-center p-3 rounded-md border">
                          <span>{meal}</span>
                          <span className="font-medium text-green-600">{[92, 88, 85, 82][idx]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Improvement Opportunities</h3>
                    <div className="space-y-2">
                      {["Broccoli Soup", "Sweet Potato Curry", "Spinach and Cheese Bake"].map((meal, idx) => (
                        <div key={meal} className="flex justify-between items-center p-3 rounded-md border">
                          <span>{meal}</span>
                          <span className="font-medium text-amber-600">{[60, 65, 68][idx]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>View Complete Analytics</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="staff" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Staff Management</CardTitle>
                <CardDescription>Oversee teachers and support staff</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Teaching Staff</h3>
                    <Button variant="outline" size="sm">Add New Staff</Button>
                  </div>
                  
                  <div className="space-y-2">
                    {rooms.map(room => (
                      <div key={room.id} className="flex items-center justify-between p-3 rounded-md border">
                        <div>
                          <h3 className="font-medium">{room.teacher}</h3>
                          <p className="text-xs text-muted-foreground">{room.name} • {room.children} children</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Message</Button>
                          <Button size="sm" variant="outline">Schedule</Button>
                          <Button size="sm" variant="outline">Performance</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Support Staff</h3>
                    <div className="space-y-2">
                      {[
                        { name: "Jane Wilson", role: "Meal Distribution Coordinator" },
                        { name: "Mark Johnson", role: "Kitchen Supervisor" },
                        { name: "Alice Smith", role: "Cleaning Staff" }
                      ].map((staff, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-md border">
                          <div>
                            <h3 className="font-medium">{staff.name}</h3>
                            <p className="text-xs text-muted-foreground">{staff.role}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Message</Button>
                            <Button size="sm" variant="outline">Schedule</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PrincipalPortal;
