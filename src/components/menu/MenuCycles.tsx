
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Calendar, Plus, Edit, Eye } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuCycle, MenuTemplate, MenuItem } from '@/types/menu';
import { WeeklyMenuView } from './WeeklyMenuView';

interface MenuCycleForm {
  name: string;
  duration: string;
  startDate: Date;
  templateId?: number;
}

export function MenuCycles({ 
  templates,
  availableMenuItems 
}: { 
  templates: MenuTemplate[];
  availableMenuItems: MenuItem[];
}) {
  const { toast } = useToast();
  const [cycles, setCycles] = useState<MenuCycle[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<MenuCycle | null>(null);

  const createForm = useForm<MenuCycleForm>();

  const handleCreateCycle = (data: MenuCycleForm) => {
    const template = templates.find(t => t.id === Number(data.templateId));
    
    if (!template) {
      toast({
        title: "Error",
        description: "Please select a valid template",
        variant: "destructive"
      });
      return;
    }
    
    const newCycle: MenuCycle = {
      id: cycles.length + 1,
      name: data.name,
      duration: data.duration,
      startDate: data.startDate,
      status: 'draft',
      template: template
    };
    
    setCycles([...cycles, newCycle]);
    setIsCreateOpen(false);
    createForm.reset();
    
    toast({
      title: "Menu Cycle Created",
      description: `${data.name} cycle has been created successfully.`
    });
  };

  const viewCycleDetails = (cycle: MenuCycle) => {
    setSelectedCycle(cycle);
    setIsViewOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button size="sm" onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Cycle
        </Button>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Menu Cycle</DialogTitle>
            </DialogHeader>
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(handleCreateCycle)} className="space-y-4">
                <FormField
                  control={createForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cycle Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter cycle name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="templateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map(template => (
                            <SelectItem key={template.id} value={template.id.toString()}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 4 weeks" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker 
                          date={field.value} 
                          setDate={(date) => field.onChange(date)} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create Cycle</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cycles.map((cycle) => (
          <Card key={cycle.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{cycle.name}</CardTitle>
                <Badge variant={cycle.status === 'active' ? 'default' : 'outline'}>
                  {cycle.status === 'active' ? 'Active' : 'Draft'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{cycle.duration}</span>
                  <span className="text-xs">
                    (Starts: {cycle.startDate.toLocaleDateString()})
                  </span>
                </div>
                {cycle.template && (
                  <div className="text-sm text-muted-foreground">
                    Template: {cycle.template.name}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewCycleDetails(cycle)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Cycle Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCycle?.name} - Menu Details
            </DialogTitle>
          </DialogHeader>
          {selectedCycle?.template && (
            <WeeklyMenuView 
              availableMenuItems={availableMenuItems}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
