
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Check, X, Utensils, AlertCircle, ClipboardList, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TeacherPortal = () => {
  const children = [
    { id: 1, name: "Alex Johnson", age: 4, room: "Sunshine", attendance: "present", special: ["Allergies: Nuts", "Vegetarian"] },
    { id: 2, name: "Emma Williams", age: 3, room: "Sunshine", attendance: "present", special: ["Lactose Intolerant"] },
    { id: 3, name: "Noah Davis", age: 4, room: "Sunshine", attendance: "absent", special: [] },
    { id: 4, name: "Olivia Brown", age: 3, room: "Sunshine", attendance: "present", special: ["Gluten Free"] },
    { id: 5, name: "William Miller", age: 4, room: "Sunshine", attendance: "present", special: [] },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Teacher Portal</h1>
              <p className="text-muted-foreground">Sunshine Room • Ms. Jennifer Wilson</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <ClipboardList className="mr-2 h-4 w-4" />
              Daily Report
            </Button>
            <Button>
              <AlertCircle className="mr-2 h-4 w-4" />
              Send Alert
            </Button>
          </div>
        </div>

        <Card className="bg-soft-green bg-opacity-10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Today's Status</h2>
                <p className="text-muted-foreground">Tuesday, April 18, 2025</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-muted-foreground">Total Children</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">4</div>
                  <div className="text-xs text-muted-foreground">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">1</div>
                  <div className="text-xs text-muted-foreground">Absent</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Meal Management</span>
            </TabsTrigger>
            <TabsTrigger value="special" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Special Requirements</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance</CardTitle>
                <CardDescription>Mark attendance for today, April 18, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {children.map(child => (
                    <div key={child.id} className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{child.name}</h3>
                          <p className="text-xs text-muted-foreground">Age: {child.age} years</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={child.attendance === "present" ? "default" : "outline"}
                          className="gap-1"
                        >
                          <Check className="h-4 w-4" />
                          Present
                        </Button>
                        <Button 
                          size="sm" 
                          variant={child.attendance === "absent" ? "destructive" : "outline"}
                          className="gap-1"
                        >
                          <X className="h-4 w-4" />
                          Absent
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex justify-end">
                    <Button>Save Attendance</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Distribution</CardTitle>
                <CardDescription>Today's lunch: Veggie Pasta with Tomato Sauce</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {children.filter(child => child.attendance === "present").map(child => (
                    <div key={child.id} className="flex items-center justify-between p-3 rounded-md border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{child.name}</h3>
                          <div className="flex gap-1 mt-1">
                            {child.special.map((req, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Check className="h-4 w-4 text-green-500" />
                            Served
                          </Button>
                        </div>
                        <select className="text-sm border rounded px-2 py-1">
                          <option>100%</option>
                          <option>75%</option>
                          <option>50%</option>
                          <option>25%</option>
                          <option>0%</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex justify-end">
                    <Button>Record Consumption</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="special" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Special Requirements</CardTitle>
                <CardDescription>Allergies, dietary preferences, and special needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {children.map(child => (
                    <div key={child.id} className="p-4 rounded-md border">
                      <h3 className="font-medium">{child.name}</h3>
                      <div className="mt-2 space-y-2">
                        {child.special.length > 0 ? (
                          child.special.map((req, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
                              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">{req}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Ensure all meals comply with this requirement
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No special requirements recorded</p>
                        )}
                        <Button variant="outline" size="sm" className="mt-2">
                          Update Requirements
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default TeacherPortal;
