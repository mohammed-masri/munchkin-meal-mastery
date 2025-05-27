
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  FlaskConical, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  Check, 
  Utensils, 
  Clock, 
  PackageCheck, 
  Truck, 
  ChefHat,
  Sandwich 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface KitchenInsight {
  id: string;
  category: 'efficiency' | 'waste' | 'quality' | 'logistics';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  implementationTime: string;
  implemented: boolean;
}

interface FoodTrend {
  id: string;
  item: string;
  servingsLastMonth: number;
  consumptionRate: number;
  consumptionTrend: 'increasing' | 'decreasing' | 'stable';
  wasteRate: number;
  wasteTrend: 'increasing' | 'decreasing' | 'stable';
}

export function KitchenAIAnalytics() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('insights');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [kitchenInsights, setKitchenInsights] = useState<KitchenInsight[]>([
    {
      id: '1',
      category: 'efficiency',
      title: 'Batch preparation optimization for pasta dishes',
      description: 'Analysis of kitchen workflow suggests combining preparation of pasta dishes on Tuesdays and Thursdays could reduce prep time by 25% and save 3 staff hours per week.',
      impact: 'high',
      implementationTime: '1 week',
      implemented: false
    },
    {
      id: '2',
      category: 'waste',
      title: 'Vegetable trimming waste reduction',
      description: 'Current vegetable preparation produces 14% excess waste. Implementing new cutting techniques and repurposing trimmings for stocks could reduce waste by 40%.',
      impact: 'medium',
      implementationTime: '2-3 days',
      implemented: false
    },
    {
      id: '3',
      category: 'quality',
      title: 'Temperature consistency for hot meals',
      description: 'Temperature logs show 12% variation in final serving temperatures. Adjusting holding times and container insulation could improve consistency and meal quality.',
      impact: 'high',
      implementationTime: '1-2 weeks',
      implemented: false
    },
    {
      id: '4',
      category: 'logistics',
      title: 'Route optimization for North district deliveries',
      description: 'GPS analysis shows North district deliveries could be resequenced to reduce driving time by 18% (22 minutes) and improve on-time delivery rates.',
      impact: 'medium',
      implementationTime: '1 day',
      implemented: false
    }
  ]);

  const foodTrends: FoodTrend[] = [
    {
      id: '1',
      item: 'Vegetable Pasta',
      servingsLastMonth: 420,
      consumptionRate: 89,
      consumptionTrend: 'increasing',
      wasteRate: 5.3,
      wasteTrend: 'decreasing'
    },
    {
      id: '2',
      item: 'Chicken Rice Bowl',
      servingsLastMonth: 385,
      consumptionRate: 94,
      consumptionTrend: 'stable',
      wasteRate: 3.1,
      wasteTrend: 'stable'
    },
    {
      id: '3',
      item: 'Fish Fingers',
      servingsLastMonth: 310,
      consumptionRate: 76,
      consumptionTrend: 'decreasing',
      wasteRate: 12.5,
      wasteTrend: 'increasing'
    },
    {
      id: '4',
      item: 'Apple Yogurt',
      servingsLastMonth: 510,
      consumptionRate: 97,
      consumptionTrend: 'stable',
      wasteRate: 1.8,
      wasteTrend: 'decreasing'
    }
  ];
  
  const handleGenerateInsights = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newInsight: KitchenInsight = {
        id: `${kitchenInsights.length + 1}`,
        category: 'efficiency',
        title: 'Pre-portioning optimization for snack items',
        description: 'AI analysis of snack distribution patterns indicates that pre-portioning yogurt parfaits the day before would reduce morning rush preparation time by 35% while maintaining quality.',
        impact: 'high',
        implementationTime: '3 days',
        implemented: false
      };
      
      setKitchenInsights([newInsight, ...kitchenInsights]);
      setIsGenerating(false);
      
      toast({
        title: "New kitchen insight generated",
        description: "AI has analyzed recent production data and provided a new optimization insight.",
      });
    }, 2000);
  };
  
  const handleImplementInsight = (id: string) => {
    setKitchenInsights(kitchenInsights.map(insight => 
      insight.id === id ? { ...insight, implemented: true } : insight
    ));
    
    toast({
      title: "Kitchen improvement implemented",
      description: "This recommendation has been marked as implemented.",
    });
  };
  
  const getImpactBadge = (impact: 'high' | 'medium' | 'low') => {
    switch(impact) {
      case 'high':
        return <Badge variant="outline" className="bg-green-100 text-green-800">High Impact</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Medium Impact</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Low Impact</Badge>;
    }
  };
  
  const getCategoryIcon = (category: 'efficiency' | 'waste' | 'quality' | 'logistics') => {
    switch(category) {
      case 'efficiency':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'waste':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'quality':
        return <ChefHat className="h-5 w-5 text-purple-500" />;
      case 'logistics':
        return <Truck className="h-5 w-5 text-green-500" />;
    }
  };

  const getTrendIcon = (trend: 'increasing' | 'decreasing' | 'stable', isPositive: boolean) => {
    if (trend === 'increasing') {
      return <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />;
    } else if (trend === 'decreasing') {
      return <TrendingUp className={`h-4 w-4 rotate-180 ${isPositive ? 'text-red-500' : 'text-green-500'}`} />;
    } else {
      return <div className="h-4 w-4 border-t border-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              <CardTitle>Kitchen AI Analytics</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={handleGenerateInsights}
              disabled={isGenerating}
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? 'Analyzing data...' : 'Generate New Insights'}
            </Button>
          </div>
          <CardDescription>
            AI-powered kitchen optimization and operational efficiency insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <FlaskConical className="h-4 w-4" />
            <AlertTitle>Kitchen AI Assistant</AlertTitle>
            <AlertDescription>
              This AI module analyzes kitchen operations, meal preparation, delivery logistics, and consumption patterns to suggest efficiency improvements and waste reduction strategies.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="insights" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Kitchen Insights
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Food Trends
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="space-y-4">
                {kitchenInsights.map(insight => (
                  <Card key={insight.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getCategoryIcon(insight.category)}
                          </div>
                          <div className="space-y-1">
                            <div className="font-medium text-lg">{insight.title}</div>
                            <p className="text-muted-foreground text-sm">{insight.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {getImpactBadge(insight.impact)}
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {insight.implementationTime}
                              </Badge>
                              {insight.implemented && (
                                <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Implemented
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {!insight.implemented && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 shrink-0"
                            onClick={() => handleImplementInsight(insight.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Implement
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Menu Item</TableHead>
                    <TableHead>Monthly Servings</TableHead>
                    <TableHead>Consumption Rate</TableHead>
                    <TableHead>Consumption Trend</TableHead>
                    <TableHead>Waste Rate</TableHead>
                    <TableHead>Waste Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foodTrends.map(trend => (
                    <TableRow key={trend.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Sandwich className="h-4 w-4 text-muted-foreground" />
                        {trend.item}
                      </TableCell>
                      <TableCell>{trend.servingsLastMonth}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {trend.consumptionRate}%
                          {getTrendIcon(trend.consumptionTrend, true)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          trend.consumptionTrend === 'increasing' ? 'default' : 
                          trend.consumptionTrend === 'decreasing' ? 'destructive' : 'outline'
                        }>
                          {trend.consumptionTrend}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {trend.wasteRate}%
                          {getTrendIcon(trend.wasteTrend, false)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          trend.wasteTrend === 'decreasing' ? 'default' : 
                          trend.wasteTrend === 'increasing' ? 'destructive' : 'outline'
                        }>
                          {trend.wasteTrend}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Card className="p-4 border-l-4 border-l-amber-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">AI Recommendation Alert</h4>
                    <p className="text-sm text-muted-foreground">
                      Fish Fingers consumption is decreasing with increasing waste. Consider reformulating the recipe or replacing with a more popular protein option.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
