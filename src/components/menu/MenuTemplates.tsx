
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Save, MenuSquare, X, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WeeklyMenuView } from './WeeklyMenuView';
import { MenuTemplate, MenuItem } from '@/types/menu';
import { Badge } from '@/components/ui/badge';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MenuPlannerHeader } from './MenuPlannerHeader';
import { MenuItemsSidebar } from './MenuItemsSidebar';

interface MenuTemplateForm {
  name: string;
  description: string;
  ageGroup: string;
  cycle: string;
}

interface MenuTemplatesProps {
  availableMenuItems: MenuItem[];
  onUseTemplate: (template: MenuTemplate) => void;
  setActiveTab?: (tab: string) => void;
}

export function MenuTemplates({ 
  availableMenuItems,
  onUseTemplate,
  setActiveTab
}: MenuTemplatesProps) {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<MenuTemplate[]>([
    {
      id: 999,
      name: "Test Template",
      description: "A template for testing purposes",
      slots: {
        Monday: { 
          Breakfast: availableMenuItems[0],
          Lunch: availableMenuItems[1], 
          Snack: availableMenuItems[4]
        },
        Tuesday: { 
          Breakfast: availableMenuItems[3], 
          Lunch: availableMenuItems[2], 
          Snack: availableMenuItems[4]
        },
        Wednesday: { 
          Breakfast: availableMenuItems[0], 
          Lunch: availableMenuItems[5], 
          Snack: availableMenuItems[4]
        },
        Thursday: { 
          Breakfast: availableMenuItems[3], 
          Lunch: availableMenuItems[1], 
          Snack: availableMenuItems[4]
        },
        Friday: { 
          Breakfast: availableMenuItems[0], 
          Lunch: availableMenuItems[2], 
          Snack: availableMenuItems[4]
        }
      }
    }
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<MenuTemplate | null>(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [menuSlots, setMenuSlots] = useState<Record<string, Record<string, MenuItem | null>>>({
    Monday: { Breakfast: null, Lunch: null, Snack: null },
    Tuesday: { Breakfast: null, Lunch: null, Snack: null },
    Wednesday: { Breakfast: null, Lunch: null, Snack: null },
    Thursday: { Breakfast: null, Lunch: null, Snack: null },
    Friday: { Breakfast: null, Lunch: null, Snack: null },
  });

  const createForm = useForm<MenuTemplateForm>({
    defaultValues: {
      name: "",
      description: "",
      ageGroup: "",
      cycle: ""
    }
  });

  useEffect(() => {
    console.log("Templates component - Detail dialog:", isDetailOpen);
    console.log("Templates component - Current template:", currentTemplate?.name || "null");
  }, [isDetailOpen, currentTemplate]);

  const handleSaveTemplate = useCallback((slots: Record<string, Record<string, MenuItem | null>>) => {
    if (!currentTemplate) {
      console.error("Cannot save template: currentTemplate is null");
      return;
    }
    
    console.log("Templates component - Saving template with name:", currentTemplate.name);
    const slotsCopy = JSON.parse(JSON.stringify(slots));
    
    const newTemplate = {
      ...currentTemplate,
      slots: slotsCopy
    };
    
    const templateExists = templates.some(t => t.id === newTemplate.id);
    
    if (templateExists) {
      setTemplates(prev => prev.map(t => t.id === newTemplate.id ? newTemplate : t));
    } else {
      setTemplates(prev => [...prev, newTemplate]);
    }
    
    console.log("Templates component - Calling onUseTemplate for:", newTemplate.name);
    onUseTemplate(newTemplate);
    
    setIsDetailOpen(false);
    setCurrentTemplate(null);
    
    toast({
      title: "Template Saved",
      description: `${newTemplate.name} template has been saved successfully.`
    });
  }, [currentTemplate, templates, onUseTemplate, toast]);

  const handleCreateTemplate = (data: MenuTemplateForm) => {
    console.log("Templates component - Creating new template:", data.name);
    
    const newTemplate = {
      id: Date.now(),
      name: data.name,
      description: `${data.ageGroup} - ${data.cycle}`,
      slots: {
        Monday: { Breakfast: null, Lunch: null, Snack: null },
        Tuesday: { Breakfast: null, Lunch: null, Snack: null },
        Wednesday: { Breakfast: null, Lunch: null, Snack: null },
        Thursday: { Breakfast: null, Lunch: null, Snack: null },
        Friday: { Breakfast: null, Lunch: null, Snack: null },
      }
    };
    
    setIsCreateOpen(false);
    
    setCurrentTemplate(newTemplate);
    setMenuSlots(newTemplate.slots);
    
    setTimeout(() => {
      setIsDetailOpen(true);
    }, 100);
    
    toast({
      title: "Template Created",
      description: "Now you can add items to your template"
    });
  };

  const handleEditTemplate = (template: MenuTemplate) => {
    console.log("Templates component - Edit button clicked for template:", template.name);
    console.log("Templates component - Edit template clicked for:", template.name);
    
    // Create a deep copy of the template to avoid reference issues
    const templateCopy = JSON.parse(JSON.stringify(template));
    
    setCurrentTemplate(templateCopy);
    setMenuSlots(templateCopy.slots);
    
    console.log("Templates component - Opening dialog for template:", template.name);
    
    // Use setTimeout to ensure state is updated before opening dialog
    setTimeout(() => {
      console.log("Templates component - Setting isDetailOpen to true");
      setIsDetailOpen(true);
    }, 100);
  };

  const filteredMenuItems = availableMenuItems.filter(item => {
    if (selectedMealType !== 'all' && item.mealType !== selectedMealType) {
      return false;
    }
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekRange = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;

  return (
    <div className="space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Template</DialogTitle>
              <DialogDescription className="text-foreground">Fill out the details to create a new menu template.</DialogDescription>
            </DialogHeader>
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(handleCreateTemplate)} className="space-y-4">
                <FormField
                  control={createForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Template Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter template name" className="text-foreground" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="ageGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age Group</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">Infants (0-1 years)</SelectItem>
                          <SelectItem value="1-2">Toddlers (1-2 years)</SelectItem>
                          <SelectItem value="2-3">Early Preschool (2-3 years)</SelectItem>
                          <SelectItem value="3-4">Preschool (3-4 years)</SelectItem>
                          <SelectItem value="4-5">Pre-K (4-5 years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="cycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu Cycle</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cycle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Create Template</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Dialog 
        open={isDetailOpen} 
        onOpenChange={(open) => {
          console.log("Detail dialog onOpenChange called with:", open);
          
          if (!open) {
            const hasChanges = currentTemplate && Object.keys(menuSlots).some(day => 
              Object.keys(menuSlots[day]).some(mealType => menuSlots[day][mealType] !== null)
            );
            
            if (hasChanges) {
              const confirmSave = window.confirm("Save changes to template?");
              if (confirmSave && currentTemplate) {
                handleSaveTemplate(menuSlots);
              }
            }
            setIsDetailOpen(false);
            setCurrentTemplate(null);
          }
        }}
      >
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl">
              {currentTemplate?.name || "Template Details"}
            </DialogTitle>
            <DialogDescription>
              Customize this template by adding menu items
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          
          <div className="p-6">
            {currentTemplate && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{currentTemplate.name}</h3>
                  <Button 
                    onClick={() => {
                      if (currentTemplate) {
                        handleSaveTemplate(menuSlots);
                      }
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                </div>
                
                <div className="flex flex-col bg-background">
                  <div className="flex gap-6">
                    <div className="w-1/4 min-w-64">
                      <Card className="h-full">
                        <CardHeader className="pb-2">
                          <h3 className="text-md font-medium">Available Menu Items</h3>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Select 
                              defaultValue={selectedMealType} 
                              onValueChange={setSelectedMealType}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Filter by type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Breakfast">Breakfast</SelectItem>
                                <SelectItem value="Lunch">Lunch</SelectItem>
                                <SelectItem value="Snack">Snack</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <div className="relative">
                              <Input
                                placeholder="Search items..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                              />
                            </div>
                              
                            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                              <div className="space-y-2">
                                {filteredMenuItems.map(item => (
                                  <Card key={item.id} className="p-2 cursor-pointer hover:bg-accent">
                                    <div className="flex items-center gap-2">
                                      <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                                        <img 
                                          src={item.image} 
                                          alt={item.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.mealType}</p>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex-1 rounded-lg">
                      <WeeklyMenuView 
                        availableMenuItems={filteredMenuItems}
                        onSaveAsTemplate={(updatedSlots) => {
                          console.log("Templates component - Saving menu slots from WeeklyMenuView");
                          setMenuSlots(updatedSlots);
                          handleSaveTemplate(updatedSlots);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">Weekly</Badge>
                {['0-1', '1-2', '2-3', '3-4', '4-5'].map(age => (
                  <Badge key={age} variant="secondary" className="text-xs">
                    {age}y
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-1/2 gap-1" 
                  onClick={() => {
                    console.log("Templates component - Edit button clicked for template:", template.name);
                    handleEditTemplate(template);
                  }}
                >
                  <Edit size={16} />
                  Edit
                </Button>
                <Button 
                  className="w-1/2" 
                  onClick={() => {
                    console.log("Templates component - Use Template button clicked for:", template.name);
                    onUseTemplate(template);
                  }}
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
