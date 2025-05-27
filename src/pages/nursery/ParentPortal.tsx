
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Calendar, MessageSquare, Utensils, BarChart2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ParentPortal = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Parent Portal</h1>
              <p className="text-muted-foreground">Welcome back, Sarah Johnson</p>
            </div>
          </div>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Teacher
          </Button>
        </div>

        <Card className="bg-soft-blue bg-opacity-10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Alex Johnson</h2>
                <p className="text-muted-foreground">Sunshine Room • Age: 4 years</p>
                <div className="flex mt-2 gap-2">
                  <Badge variant="outline">Allergies: Nuts</Badge>
                  <Badge variant="outline">Vegetarian</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">97%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">Good</div>
                  <div className="text-xs text-muted-foreground">Meal Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="meals" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span>Meal Plans</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Nutrition Reports</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Special Alerts</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="meals" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    This Week's Menu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
                      <div key={day} className="border-b pb-3 last:border-0">
                        <div className="font-medium text-foreground">{day}</div>
                        <div className="text-sm text-muted-foreground mt-1">Veggie Pasta with Tomato Sauce</div>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">High Protein</Badge>
                          <Badge variant="secondary" className="text-xs">Vegetarian</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Consumption History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-foreground">
                      <span>Last Week Average</span>
                      <span className="font-medium text-green-500">85%</span>
                    </div>
                    <div className="flex items-center justify-between text-foreground">
                      <span>Favorite Food</span>
                      <span className="font-medium">Veggie Pasta</span>
                    </div>
                    <div className="flex items-center justify-between text-foreground">
                      <span>Least Favorite</span>
                      <span className="font-medium text-amber-500">Broccoli Soup</span>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">View Detailed History</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Weekly nutritional analysis of your child's consumed meals
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["Protein", "Carbs", "Fats", "Vitamins"].map(nutrient => (
                    <Card key={nutrient}>
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-foreground">{nutrient}</div>
                        <div className="text-3xl font-bold text-primary mt-2">
                          {Math.floor(Math.random() * 30) + 70}%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">of daily value</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Special Requirements & Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-md">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground">Allergy Alert: Nuts</h3>
                      <p className="text-sm text-muted-foreground">
                        All meals are prepared in a nut-free environment, but please confirm with staff for any concerns.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-md">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground">Meal Preference: Vegetarian</h3>
                      <p className="text-sm text-muted-foreground">
                        Your child receives vegetarian meal options according to your preferences.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button className="w-full">Update Special Requirements</Button>
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

export default ParentPortal;
