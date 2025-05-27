import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, Users, Workflow, FileText, Utensils, ChefHat, Package2, Truck, ClipboardList, CircleDashed, Clock, CheckCircle2, BarChart } from 'lucide-react';
import { StatusBadge } from '@/components/logistics/StatusBadge';

const Guide = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guide</h1>
          <p className="text-muted-foreground mt-1">
            Learn about Munchkin Meals workflow and roles
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-primary" />
                <CardTitle>Application Workflow</CardTitle>
              </div>
              <CardDescription>Understanding the meal planning and distribution process</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="menu-planning">
                  <AccordionTrigger>1. Menu Planning</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>Menu managers create and manage weekly meal plans, considering nutritional requirements and dietary restrictions.
                      They can use templates and cycles to streamline the planning process.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Utensils className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Create Menu Cycles</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Build repeatable menu cycles to simplify planning</p>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Manage Templates</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Create and modify menu templates for different seasons</p>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CircleDashed className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Special Diets</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Track and manage dietary requirements and allergies</p>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="production">
                  <AccordionTrigger>2. Production Planning</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>Production managers schedule meal preparation based on daily requirements,
                      coordinate ingredients, and ensure proper kitchen workflow.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ChefHat className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Kitchen Operations</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Schedule and manage meal preparation in the kitchen</p>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardList className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Production Schedule</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Create and manage production timelines</p>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Meal Timing</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Coordinate meal preparation with delivery schedules</p>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="logistics">
                  <AccordionTrigger>3. Logistics Management</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>The logistics team manages meal production schedules, coordinates with kitchen staff,
                      and ensures proper packaging and labeling of meals for each nursery.</p>
                      
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="bg-muted/40 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Distribution Workflow</h3>
                          
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="relative rounded-full p-2 flex items-center justify-center bg-primary text-primary-foreground">
                                <Package2 className="h-5 w-5" />
                                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-secondary text-white">1</div>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">Packing</p>
                                <p className="text-xs text-muted-foreground">Package meals according to nursery requirements</p>
                              </div>
                            </div>
                            
                            <div className="hidden md:block">
                              <div className="h-0.5 w-12 bg-muted-foreground/30"></div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative rounded-full p-2 flex items-center justify-center bg-primary text-primary-foreground">
                                <FileText className="h-5 w-5" />
                                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-secondary text-white">2</div>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">Labeling</p>
                                <p className="text-xs text-muted-foreground">Label packages with dietary and nursery information</p>
                              </div>
                            </div>
                            
                            <div className="hidden md:block">
                              <div className="h-0.5 w-12 bg-muted-foreground/30"></div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="relative rounded-full p-2 flex items-center justify-center bg-primary text-primary-foreground">
                                <ClipboardList className="h-5 w-5" />
                                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-secondary text-white">3</div>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">Distribution</p>
                                <p className="text-xs text-muted-foreground">Organize packaged meals for delivery</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Package Status Tracking:</h3>
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge status="ready" />
                          <StatusBadge status="preparing" />
                          <StatusBadge status="in-transit" />
                          <StatusBadge status="delivered" />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="distribution">
                  <AccordionTrigger>4. Distribution</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>Delivery routes are planned and optimized. Drivers receive their assignments
                      and ensure timely delivery of meals to nurseries.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Truck className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Delivery Management</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Track drivers and deliveries in real-time</p>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Package2 className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Order Tracking</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Monitor order status from kitchen to nursery</p>
                        </Card>
                        
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <h3 className="font-medium">Delivery Confirmation</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Verify and confirm successful deliveries</p>
                        </Card>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="monitoring">
                  <AccordionTrigger>5. Monitoring and Reporting</AccordionTrigger>
                  <AccordionContent>
                    <p>Track meal distribution, generate reports, and analyze data to improve
                    efficiency and ensure quality service.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart className="h-4 w-4 text-primary" />
                          <h3 className="font-medium">Performance Analytics</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Track key metrics like delivery times and meal quality</p>
                      </Card>
                      
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <h3 className="font-medium">Reporting</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Generate detailed reports on operations</p>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Roles and Responsibilities</CardTitle>
              </div>
              <CardDescription>Key roles in the meal management system</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="menu-manager">
                  <AccordionTrigger>Menu Manager</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Creates and manages meal plans</li>
                      <li>Ensures nutritional guidelines are met</li>
                      <li>Manages dietary restrictions and special requirements</li>
                      <li>Develops menu cycles and templates</li>
                      <li>Coordinates with nutritionists and dietitians</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="production-manager">
                  <AccordionTrigger>Production Manager</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Plans production schedules</li>
                      <li>Coordinates ingredient procurement</li>
                      <li>Manages kitchen staff assignments</li>
                      <li>Ensures food safety compliance</li>
                      <li>Coordinates with logistics team</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="logistics-coordinator">
                  <AccordionTrigger>Logistics Coordinator</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Oversees meal production schedule</li>
                      <li>Manages kitchen operations</li>
                      <li>Coordinates packaging and labeling</li>
                      <li>Plans delivery routes</li>
                      <li>Manages inventory and supplies</li>
                      <li>Tracks order status and handles exceptions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kitchen-staff">
                  <AccordionTrigger>Kitchen Staff</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Prepares meals according to plans</li>
                      <li>Follows food safety guidelines</li>
                      <li>Handles packaging and portioning</li>
                      <li>Maintains kitchen cleanliness</li>
                      <li>Manages special diet preparation</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delivery-driver">
                  <AccordionTrigger>Delivery Driver</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Delivers meals to nurseries</li>
                      <li>Follows optimized routes</li>
                      <li>Ensures proper handling during transport</li>
                      <li>Reports delivery status</li>
                      <li>Collects signatures and confirms receipt</li>
                      <li>Handles any delivery exceptions</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="quality-controller">
                  <AccordionTrigger>Quality Controller</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Monitors meal quality and safety</li>
                      <li>Conducts regular inspections</li>
                      <li>Ensures compliance with standards</li>
                      <li>Manages feedback and improvement processes</li>
                      <li>Coordinates with all departments on quality issues</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package2 className="h-5 w-5 text-primary" />
                <CardTitle>Distribution Operations Guide</CardTitle>
              </div>
              <CardDescription>Step-by-step process for meal distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">1. Packing Process</h3>
                  <div className="pl-5 border-l-2 border-muted space-y-2">
                    <p className="text-sm">Meals are packaged according to nursery requirements and quantities.</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Check the packing queue for priorities</li>
                      <li>Package meals according to specified quantities</li>
                      <li>Handle special diets separately with clear labels</li>
                      <li>Mark orders as packed when complete</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">2. Labeling Process</h3>
                  <div className="pl-5 border-l-2 border-muted space-y-2">
                    <p className="text-sm">All packages must be properly labeled with nursery, meal, and dietary information.</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Generate labels for each package</li>
                      <li>Ensure special diet labels are prominently displayed</li>
                      <li>Include nursery name and delivery information</li>
                      <li>Mark orders as labeled when complete</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">3. Distribution Management</h3>
                  <div className="pl-5 border-l-2 border-muted space-y-2">
                    <p className="text-sm">Track special requirements and organize packages for delivery.</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Review special dietary requirements for each nursery</li>
                      <li>Organize packages by route and delivery time</li>
                      <li>Update package status as they move through the workflow</li>
                      <li>Prepare packages for driver pickup</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">4. Delivery Management</h3>
                  <div className="pl-5 border-l-2 border-muted space-y-2">
                    <p className="text-sm">Coordinate drivers and track deliveries to ensure timely arrival.</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Assign drivers to routes</li>
                      <li>Track delivery status in real-time</li>
                      <li>Confirm deliveries with nurseries</li>
                      <li>Handle any delivery exceptions or delays</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Guide;
