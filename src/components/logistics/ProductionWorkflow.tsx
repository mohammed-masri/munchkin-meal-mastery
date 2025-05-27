
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, CookingPot, Check, Package } from 'lucide-react';

interface ProductionWorkflowProps {
  activeStep: string;
  onStepChange: (step: string) => void;
}

export function ProductionWorkflow({ activeStep, onStepChange }: ProductionWorkflowProps) {
  const workflowSteps = [
    {
      id: 'view',
      label: 'View Today\'s Plan',
      icon: <CalendarDays className="h-5 w-5 mr-2" />,
      description: 'Review the production schedule for the day'
    },
    {
      id: 'cooking',
      label: 'Start Cooking',
      icon: <CookingPot className="h-5 w-5 mr-2" />,
      description: 'Begin meal preparation according to schedule'
    },
    {
      id: 'finished',
      label: 'Finish Cooking',
      icon: <Check className="h-5 w-5 mr-2" />,
      description: 'Mark meal preparation as complete'
    },
    {
      id: 'ready',
      label: 'Ready to Pack',
      icon: <Package className="h-5 w-5 mr-2" />,
      description: 'Move meals to the packing station'
    }
  ];

  const getStepStatus = (stepId: string) => {
    const stepIndex = workflowSteps.findIndex(step => step.id === stepId);
    const activeIndex = workflowSteps.findIndex(step => step.id === activeStep);
    
    if (stepIndex < activeIndex) return 'completed';
    if (stepIndex === activeIndex) return 'current';
    return 'upcoming';
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-medium text-foreground">Production Workflow</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Follow these steps to complete the kitchen production process
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {workflowSteps.map((step, index) => {
              const status = getStepStatus(step.id);
              
              return (
                <div key={step.id} className="flex flex-col">
                  <Button
                    variant={status === 'current' ? 'default' : 'outline'}
                    className={`
                      h-auto py-4 w-full justify-start text-left
                      ${status === 'completed' ? 'bg-highlight border-primary/20 text-foreground' : ''}
                      ${status === 'current' ? 'bg-primary text-primary-foreground' : ''}
                      ${status === 'upcoming' ? 'opacity-70 border-border text-foreground' : ''}
                    `}
                    onClick={() => onStepChange(step.id)}
                    disabled={index > workflowSteps.findIndex(s => s.id === activeStep) + 1}
                  >
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center">
                        {step.icon}
                        <span className="font-medium">{step.label}</span>
                      </div>
                      <p className="text-xs ml-7 opacity-80">{step.description}</p>
                    </div>
                  </Button>
                  
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:flex justify-center my-2">
                      <div className="w-8 h-0.5 bg-highlight"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
