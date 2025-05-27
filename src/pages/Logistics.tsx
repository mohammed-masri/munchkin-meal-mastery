import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileSearch, 
  CalendarDays, 
  CookingPot, 
  Check,
  Package,
  Users,
  UtensilsCrossed,
  ChefHat,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { KitchenInstructions } from '@/components/logistics/KitchenInstructions';
import { ProductionWorkflow } from '@/components/logistics/ProductionWorkflow';
import { DateRangePicker } from '@/components/logistics/DateRangePicker';
import { KitchenScheduleDetails } from '@/components/logistics/KitchenScheduleDetails';
import { BulkLabelPrinting } from '@/components/logistics/BulkLabelPrinting';

const Logistics = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<string>("view");

  const handleActionClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} action has been initiated`,
    });
  };

  const handleWorkflowStepChange = (step: string) => {
    setActiveWorkflowStep(step);
    toast({
      title: "Workflow Step Changed",
      description: `Kitchen production workflow is now in "${step}" step`,
    });
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">Kitchen Production</h1>
            <p className="text-muted-foreground mt-1">
              Manage food preparation and kitchen operations
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <DateRangePicker date={date} setDate={setDate} />
            <Button 
              variant="outline"
              className="bg-red-50 hover:bg-red-100"
              onClick={() => handleActionClick("View Exceptions")}
            >
              <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
              View Exceptions
            </Button>
          </div>
        </div>

        <ProductionWorkflow 
          activeStep={activeWorkflowStep} 
          onStepChange={handleWorkflowStepChange} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Children Today</p>
                    <h3 className="text-2xl font-bold">180</h3>
                    <p className="text-sm text-muted-foreground">Across 5 nurseries</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Total Meals</p>
                    <h3 className="text-2xl font-bold">540</h3>
                    <p className="text-sm text-muted-foreground">180 per meal type</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Special Requirements</p>
                    <h3 className="text-2xl font-bold">26</h3>
                    <p className="text-sm text-muted-foreground">Dietary accommodations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Next Service</p>
                    <h3 className="text-2xl font-bold">Lunch</h3>
                    <p className="text-sm text-muted-foreground">Starts at 11:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <KitchenScheduleDetails date={date} />

        <KitchenInstructions />
      </div>
    </MainLayout>
  );
};

export default Logistics;
