
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scan, Tag, ScanBarcode } from 'lucide-react';

const TaggingSystem = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Item Tagging</h1>
            <p className="text-muted-foreground mt-1">
              Scan and tag items for delivery tracking
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Add New Tag
          </Button>
        </div>

        <Tabs defaultValue="scan" className="space-y-4">
          <TabsList>
            <TabsTrigger value="scan">Scan Items</TabsTrigger>
            <TabsTrigger value="tags">Manage Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="scan">
            <Card>
              <CardHeader>
                <CardTitle>Scan Items</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="w-full max-w-md aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <ScanBarcode className="h-12 w-12 text-muted-foreground" />
                </div>
                <Button className="w-full max-w-md">
                  <Scan className="mr-2 h-4 w-4" />
                  Start Scanning
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Tag Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {['Kitchen', 'Delivery', 'Special Diet', 'Temperature Control'].map((tag) => (
                    <div key={tag} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{tag}</span>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
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

export default TaggingSystem;
