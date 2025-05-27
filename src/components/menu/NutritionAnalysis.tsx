
import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { pipeline } from '@huggingface/transformers';
import { MenuItem } from '@/types/menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

interface NutritionAnalysisProps {
  menuItem: MenuItem;
}

export function NutritionAnalysis({ menuItem }: NutritionAnalysisProps) {
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeNutrition = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const classifier = await pipeline(
        'text-classification',
        'nateraw/food-nutrition-classification'
      );

      const itemDescription = `${menuItem.name} contains ${menuItem.nutritionTags.join(', ')}`;
      const results = await classifier(itemDescription);
      
      const insights = results
        .map((result: any) => {
          const { label, score } = result;
          if (score > 0.5) {
            return label.replace('_', ' ').toLowerCase();
          }
          return null;
        })
        .filter(Boolean);

      setAnalysis(insights);
    } catch (error) {
      console.error('Error analyzing nutrition:', error);
      setError("Unable to analyze nutrition at this time");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={analyzeNutrition} 
            disabled={isAnalyzing}
            className="text-muted-foreground hover:text-primary"
          >
            <Brain 
              className={`h-4 w-4 ${isAnalyzing ? 'animate-pulse' : ''}`} 
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          <div className="max-w-xs p-2">
            {isAnalyzing ? (
              <p>Analyzing nutrition...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : analysis.length > 0 ? (
              <div>
                <p className="font-semibold mb-1">Nutrition Insights:</p>
                <ul className="list-disc list-inside text-sm">
                  {analysis.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Click to get AI nutrition analysis</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
