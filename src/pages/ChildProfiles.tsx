
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, FileCheck, FileSpreadsheet, FilePieChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ChildProfiles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const childProfiles = [
    {
      id: 1,
      name: "Emma Johnson",
      age: "4",
      nursery: "Sunshine Nursery",
      dietaryRequirements: ["Gluten-Free"],
      attendance: "Present today"
    },
    {
      id: 2,
      name: "Oliver Smith",
      age: "3",
      nursery: "Rainbow Daycare",
      dietaryRequirements: ["Nut-Free", "Dairy-Free"],
      attendance: "Present today"
    },
    {
      id: 3,
      name: "Sophia Williams",
      age: "4",
      nursery: "Little Explorers",
      dietaryRequirements: ["Vegetarian"],
      attendance: "Present today"
    },
    {
      id: 4,
      name: "Noah Brown",
      age: "2",
      nursery: "Growing Minds",
      dietaryRequirements: ["None"],
      attendance: "Absent today"
    },
    {
      id: 5,
      name: "Ava Jones",
      age: "3",
      nursery: "Tiny Tots",
      dietaryRequirements: ["Egg-Free"],
      attendance: "Present today"
    }
  ];
  
  const filteredProfiles = childProfiles.filter(child => 
    child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    child.nursery.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Child Profiles</h1>
          <p className="text-muted-foreground mt-1">
            Manage children's dietary information and preferences
          </p>
        </div>
        
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <FilePieChart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Connected to Meal Management</h3>
                <p className="text-sm text-muted-foreground">Dietary requirements sync with logistics system</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <FileCheck className="h-3 w-3 mr-1" /> Connected
            </Badge>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="profiles" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="profiles">Profiles</TabsTrigger>
              <TabsTrigger value="dietary">Dietary Management</TabsTrigger>
              <TabsTrigger value="import">SIS Import</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search child or nursery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <TabsContent value="profiles">
            <Card>
              <CardHeader>
                <CardTitle>Child Profiles</CardTitle>
                <CardDescription>View and manage children's information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Nursery</TableHead>
                      <TableHead>Dietary Requirements</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfiles.map((child) => (
                      <TableRow key={child.id}>
                        <TableCell className="font-medium">{child.name}</TableCell>
                        <TableCell>{child.age}y</TableCell>
                        <TableCell>{child.nursery}</TableCell>
                        <TableCell>
                          {child.dietaryRequirements.map((req, idx) => (
                            <Badge key={idx} variant="outline" className="mr-1">
                              {req}
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={child.attendance.includes("Present") ? "default" : "secondary"}
                            className={child.attendance.includes("Present") 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"}
                          >
                            {child.attendance}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dietary">
            <Card>
              <CardHeader>
                <CardTitle>Dietary Management</CardTitle>
                <CardDescription>Manage dietary requirements and allergies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-6">
                  <Button variant="outline" size="sm">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export Dietary Report
                  </Button>
                  <Button size="sm">
                    Add Requirements
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Common Allergies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Nut Allergies</span>
                          <Badge>7 children</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Dairy Allergies</span>
                          <Badge>5 children</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Gluten Intolerance</span>
                          <Badge>8 children</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Egg Allergies</span>
                          <Badge>3 children</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Dietary Preferences</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Vegetarian</span>
                          <Badge>9 children</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Vegan</span>
                          <Badge>2 children</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Halal</span>
                          <Badge>6 children</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Kosher</span>
                          <Badge>1 child</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="import">
            <Card>
              <CardHeader>
                <CardTitle>SIS Data Import</CardTitle>
                <CardDescription>Import and sync data from Student Information System</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 text-center bg-muted/50 rounded-lg">
                  <Badge className="bg-green-100 text-green-800 mb-2">
                    <FileCheck className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                  <h3 className="text-lg font-medium mb-2">SIS Integration Active</h3>
                  <p className="text-muted-foreground mb-4">
                    Child profiles, attendance data, and dietary requirements are automatically synced
                    with the nursery management system.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button>
                      <FileCheck className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button variant="outline">
                      View Sync Logs
                    </Button>
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

export default ChildProfiles;
