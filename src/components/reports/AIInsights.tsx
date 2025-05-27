import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Sparkles, TrendingUp, Brain, School, AlertTriangle, Check, Heart, Baby, Users, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Insight {
  id: string;
  type: 'suggestion' | 'alert' | 'improvement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  implementationTime: string;
  implemented: boolean;
}

export function AIInsights() {
  const { toast } = useToast();
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'suggestion',
      title: 'Reading activities for Sunshine Nursery',
      description: 'Analysis shows children at Sunshine Nursery have high engagement with story time. Consider expanding the reading corner and introducing 3 new book themes based on their interests.',
      impact: 'high',
      implementationTime: '2-3 days',
      implemented: false
    },
    {
      id: '2',
      type: 'alert',
      title: 'Social interaction patterns in Rainbow Room',
      description: 'Social interaction metrics for Rainbow Room show 4 children consistently playing alone. Consider implementing more structured group activities to foster inclusion.',
      impact: 'medium',
      implementationTime: '1 week',
      implemented: false
    },
    {
      id: '3',
      type: 'improvement',
      title: 'Optimize nap schedules based on energy patterns',
      description: 'AI analysis of behavior patterns suggests adjusting nap times by 20 minutes at Little Explorers would align better with natural energy cycles, potentially reducing afternoon fussiness by 30%.',
      impact: 'high',
      implementationTime: '1-2 weeks',
      implemented: false
    },
    {
      id: '4',
      type: 'suggestion',
      title: 'Personalized learning paths for advanced learners',
      description: 'Five children across nurseries are showing advanced cognitive development in problem-solving. Consider implementing personalized learning pathways to maintain engagement and development.',
      impact: 'medium',
      implementationTime: '1 month',
      implemented: false
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateInsights = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newInsight: Insight = {
        id: `${insights.length + 1}`,
        type: 'improvement',
        title: 'Sensory play expansion for developmental support',
        description: 'Analysis of developmental metrics indicates 7 children at Growing Minds would benefit from enhanced sensory play. Consider adding a water table and additional tactile materials.',
        impact: 'high',
        implementationTime: '1 week',
        implemented: false
      };
      
      setInsights([newInsight, ...insights]);
      setIsGenerating(false);
      
      toast({
        title: "New insight generated",
        description: "AI has analyzed recent child development data and provided a new insight.",
      });
    }, 2000);
  };
  
  const handleImplementInsight = (id: string) => {
    setInsights(insights.map(insight => 
      insight.id === id ? { ...insight, implemented: true } : insight
    ));
    
    toast({
      title: "Insight marked as implemented",
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
  
  const getTypeIcon = (type: 'suggestion' | 'alert' | 'improvement') => {
    switch(type) {
      case 'suggestion':
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'improvement':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Child Development Insights</CardTitle>
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
          AI-powered recommendations based on child development patterns and nursery activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map(insight => (
            <Card key={insight.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getTypeIcon(insight.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-lg">{insight.title}</div>
                      <p className="text-muted-foreground text-sm">{insight.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getImpactBadge(insight.impact)}
                        <Badge variant="outline" className="flex items-center gap-1">
                          <School className="h-3 w-3" />
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
      </CardContent>
    </Card>
  );
}
