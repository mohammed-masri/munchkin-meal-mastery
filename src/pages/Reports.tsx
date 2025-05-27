
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NutritionalAnalytics } from '@/components/reports/NutritionalAnalytics';
import { MealConsumptionPredictions } from '@/components/reports/MealConsumptionPredictions';
import { KitchenAIAnalytics } from '@/components/reports/KitchenAIAnalytics';
import { BarChart2, TrendingUp, Brain, FlaskConical } from 'lucide-react';

const Reports = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 w-full">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            Kitchen Analytics
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            AI-powered kitchen operations and meal distribution insights
          </p>
        </div>
        
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="nutrition" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 px-2 text-xs md:text-sm">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Nutritional Analytics</span>
              <span className="sm:hidden">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="consumption" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 px-2 text-xs md:text-sm">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Consumption Predictions</span>
              <span className="sm:hidden">Consumption</span>
            </TabsTrigger>
            <TabsTrigger value="kitchen" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 px-2 text-xs md:text-sm">
              <FlaskConical className="h-4 w-4" />
              <span className="hidden sm:inline">Kitchen AI</span>
              <span className="sm:hidden">Kitchen</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="nutrition" className="mt-6 space-y-6">
            <NutritionalAnalytics />
          </TabsContent>
          
          <TabsContent value="consumption" className="mt-6 space-y-6">
            <MealConsumptionPredictions />
          </TabsContent>
          
          <TabsContent value="kitchen" className="mt-6 space-y-6">
            <KitchenAIAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;
