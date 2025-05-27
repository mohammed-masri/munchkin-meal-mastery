
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, School, BarChart2, Utensils, Users, Map, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeadOfficePortal = () => {
  const nurseries = [
    { id: 1, name: "Bright Beginnings Nursery", location: "North London", children: 20, attendance: 16, principal: "Mrs. Sarah Thompson", status: "normal" },
    { id: 2, name: "Little Explorers Nursery", location: "South London", children: 25, attendance: 22, principal: "Mr. David Wilson", status: "normal" },
    { id: 3, name: "Tiny Tots Learning Center", location: "East London", children: 18, attendance: 14, principal: "Mrs. Emily Brown", status: "attention" },
    { id: 4, name: "Growing Minds Nursery", location: "West London", children: 22, attendance: 20, principal: "Ms. Jessica Clark", status: "normal" },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Head Office Portal</h1>
              <p className="text-foreground">Munchkin Meals Network Administration</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Map className="mr-2 h-4 w-4" />
              Network Map
            </Button>
            <Button>
              <BarChart2 className="mr-2 h-4 w-4" />
              Executive Reports
            </Button>
          </div>
        </div>

        <Card className="bg-soft-purple bg-opacity-10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Network Overview</h2>
                <p className="text-foreground">Tuesday, April 18, 2025</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4</div>
                  <div className="text-xs text-foreground">Nurseries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">85</div>
                  <div className="text-xs text-foreground">Total Children</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">72</div>
                  <div className="text-xs text-foreground">Present Today</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="network" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 bg-card">
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Network Overview</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Performance Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Menu Standardization</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="network" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Nursery Network</CardTitle>
                <CardDescription className="text-foreground">Status of all nurseries in the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nurseries.map(nursery => (
                    <div key={nursery.id} className="border p-4 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-foreground">{nursery.name}</h3>
                            {nursery.status === "attention" && (
                              <Badge variant="destructive">Needs Attention</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {nursery.location} • Principal: {nursery.principal}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                      
                      <div className="grid grid-cols-3 mt-4 gap-4">
                        <div className="text-center p-2 bg-background rounded-md border">
                          <div className="text-sm font-medium text-foreground">Children</div>
                          <div className="text-xl font-bold text-primary">{nursery.children}</div>
                        </div>
                        <div className="text-center p-2 bg-background rounded-md border">
                          <div className="text-sm font-medium text-foreground">Attendance</div>
                          <div className="text-xl font-bold text-green-500">{nursery.attendance}</div>
                        </div>
                        <div className="text-center p-2 bg-background rounded-md border">
                          <div className="text-sm font-medium text-foreground">Meal Rating</div>
                          <div className="text-xl font-bold text-amber-500">{Math.floor(Math.random() * 10) + 85}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BarChart2 className="h-5 w-5" />
                    Network Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="text-center">
                      <div className="text-muted-foreground">Performance Chart</div>
                      <div className="text-xs text-muted-foreground">[Placeholder for chart]</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-md">
                      <div className="text-sm font-medium text-foreground">Attendance Rate</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-green-600 font-bold">85%</span>
                        <span className="text-xs text-green-600">+3% vs. last month</span>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="text-sm font-medium text-foreground">Meal Satisfaction</div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-green-600 font-bold">88%</span>
                        <span className="text-xs text-green-600">+5% vs. last month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <AlertCircle className="h-5 w-5" />
                    Attention Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-md">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Tiny Tots Learning Center</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Attendance rate has dropped by 10% compared to last month.
                        </p>
                        <Button size="sm" className="mt-2">Investigate Issue</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-md">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Menu Issue: Sweet Potato Curry</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          This meal has below 70% consumption rate across all nurseries.
                        </p>
                        <Button size="sm" className="mt-2">Review Recipe</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-green-50 rounded-md">
                      <School className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-foreground">Staff Training Reminder</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quarterly food safety training is scheduled for next week.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">View Schedule</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="menu" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground">Menu Standardization</CardTitle>
                <CardDescription className="text-foreground">Maintain consistent quality across all nurseries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 text-foreground">Current Menu Cycle</h3>
                    <div className="border p-4 rounded-md bg-background">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-foreground">Spring Menu Cycle</span>
                          <p className="text-sm text-muted-foreground">April 1 - June 30, 2025</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm">Modify</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                          <div key={day} className="p-2 border rounded-md text-center">
                            <div className="text-sm font-medium text-foreground">{day}</div>
                            <div className="text-xs text-muted-foreground mt-1">4 meals</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 text-foreground">Menu Performance by Nursery</h3>
                    <div className="space-y-2">
                      {nurseries.map(nursery => (
                        <div key={nursery.id} className="flex justify-between items-center p-3 rounded-md border">
                          <span className="text-foreground">{nursery.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground">
                              {Math.floor(Math.random() * 10) + 80}% compliance
                            </span>
                            <Button size="sm" variant="outline">Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 text-foreground">Special Dietary Needs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: "Vegetarian", count: 15, percent: 18 },
                        { label: "Allergies", count: 12, percent: 14 },
                        { label: "Religious", count: 8, percent: 9 }
                      ].map(diet => (
                        <Card key={diet.label}>
                          <CardContent className="p-4">
                            <div className="text-sm font-medium text-foreground">{diet.label}</div>
                            <div className="text-2xl font-bold text-primary mt-1">{diet.count}</div>
                            <div className="text-xs text-muted-foreground">
                              {diet.percent}% of total children
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Download Menu Reports</Button>
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

export default HeadOfficePortal;
