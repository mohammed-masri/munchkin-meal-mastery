
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilterX, Search, Utensils, ListChecks } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { MenuCycles } from '@/components/menu/MenuCycles';
import { AddMenuItemDialog } from '@/components/menu/AddMenuItemDialog';
import { Badge } from '@/components/ui/badge';
import { MenuTemplate, MenuItem } from '@/types/menu';
import { MenuTemplates } from '@/components/menu/MenuTemplates';
import { ViewToggle } from '@/components/menu/ViewToggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  {
    id: 1,
    name: 'Oatmeal with Berries',
    ageGroups: ['0-1', '1-2', '2-3', '3-4', '4-5'],
    mealType: 'Breakfast',
    nutritionTags: ['Fiber', 'Protein'],
    allergens: ['None'],
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9hdG1lYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    name: 'Veggie Pasta Bake',
    ageGroups: ['1-2', '2-3', '3-4', '4-5'],
    mealType: 'Lunch',
    nutritionTags: ['Protein', 'Fiber', 'Vitamin C'],
    allergens: ['Gluten', 'Dairy'],
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFzdGElMjBiYWtlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Chicken and Rice Bowl',
    ageGroups: ['1-2', '2-3', '3-4', '4-5'],
    mealType: 'Lunch',
    nutritionTags: ['Protein', 'Carbs', 'Vitamin B'],
    allergens: ['None'],
    dietary: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMGFuZCUyMHJpY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    name: 'Yogurt Parfait',
    ageGroups: ['1-2', '2-3', '3-4', '4-5'],
    mealType: 'Breakfast',
    nutritionTags: ['Calcium', 'Protein', 'Probiotics'],
    allergens: ['Dairy'],
    dietary: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0JTIwcGFyZmFpdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    name: 'Apple Slices with Yogurt',
    ageGroups: ['0-1', '1-2', '2-3', '3-4', '4-5'],
    mealType: 'Snack',
    nutritionTags: ['Fiber', 'Vitamin C', 'Calcium'],
    allergens: ['Dairy'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBzbGljZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    name: 'Fish Fingers with Sweet Potato Mash',
    ageGroups: ['1-2', '2-3', '3-4', '4-5'],
    mealType: 'Lunch',
    nutritionTags: ['Protein', 'Omega-3', 'Vitamin A'],
    allergens: ['Fish', 'Gluten'],
    dietary: ['None'],
    image: 'https://images.unsplash.com/photo-1544378730-8b5104b28de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaCUyMGZpbmdlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  }
];

const MenuManagement = () => {
  const { toast } = useToast();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [templates, setTemplates] = useState<MenuTemplate[]>([
    {
      id: 1,
      name: "Weekly Standard",
      description: "A balanced weekly menu for all age groups",
      slots: {}
    },
    {
      id: 2,
      name: "Vegetarian Week",
      description: "A plant-based menu for the week",
      slots: {}
    }
  ]);
  
  const [activeTab, setActiveTab] = useState('items');
  const [plannerView, setPlannerView] = useState<'list' | 'weekly'>('weekly');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    console.log("MenuManagement - Active tab changed to:", activeTab);
  }, [activeTab]);
  
  const forceTabUpdate = (tab: string) => {
    console.log("MenuManagement - Setting active tab to:", tab);
    setActiveTab(tab);
  };

  const filteredItems = menuItems.filter(item => {
    if (selectedAgeGroup && !item.ageGroups.includes(selectedAgeGroup)) {
      return false;
    }
    if (selectedMealType !== 'all' && item.mealType !== selectedMealType) {
      return false;
    }
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleUseTemplate = (template: MenuTemplate) => {
    console.log("MenuManagement - Using template:", template.name);
    
    const templateCopy = JSON.parse(JSON.stringify(template));
    
    const existingTemplateIndex = templates.findIndex(t => t.id === templateCopy.id);
    
    if (existingTemplateIndex !== -1) {
      const updatedTemplates = [...templates];
      updatedTemplates[existingTemplateIndex] = templateCopy;
      setTemplates(updatedTemplates);
    } else {
      setTemplates(prev => [...prev, templateCopy]);
    }
    
    toast({
      title: "Template Applied",
      description: `${template.name} template has been ${existingTemplateIndex !== -1 ? 'updated' : 'created'} and selected.`
    });
  };

  const handleAddItemToTemplate = (templateId: number, menuItem: MenuItem, day: string, mealType: string) => {
    const updatedTemplates = templates.map(template => {
      if (template.id === templateId) {
        const updatedSlots = {
          ...template.slots
        };
        
        if (!updatedSlots[day]) {
          updatedSlots[day] = {};
        }
        
        updatedSlots[day] = {
          ...updatedSlots[day],
          [mealType]: menuItem
        };
        
        return {
          ...template,
          slots: updatedSlots
        };
      }
      return template;
    });
    
    setTemplates(updatedTemplates);
    
    toast({
      title: "Menu Item Added",
      description: `${menuItem.name} has been added to ${day}'s ${mealType} in the ${templates.find(t => t.id === templateId)?.name} template.`
    });
  };

  console.log("MenuManagement - Current templates:", templates.map(t => t.name));
  console.log("MenuManagement - Current active tab:", activeTab);

  return (
    <div className="flex flex-col min-h-screen">
      <MainLayout>
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                Menu Management
              </h1>
              <p className="text-lg text-foreground">
                Create and manage meal plans for all age groups
              </p>
            </div>
            <AddMenuItemDialog />
          </motion.div>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TabsList className="bg-muted/10 p-1 border border-border justify-start w-full">
                <TabsTrigger 
                  value="items" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground hover:border-primary hover:text-primary"
                >
                  <ListChecks size={16} className="mr-2" />
                  Menu Items
                </TabsTrigger>
                <TabsTrigger 
                  value="planner" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground hover:border-primary hover:text-primary"
                >
                  <Utensils size={16} className="mr-2" />
                  Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="cycles" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground hover:border-primary hover:text-primary"
                >
                  Menu Cycles
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <TabsContent value="items" className="mt-0 border-t pt-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="mb-6">
                    <div className="p-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search menu items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                          />
                        </div>
                        
                        <Select defaultValue={selectedMealType} onValueChange={setSelectedMealType}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Breakfast">Breakfast</SelectItem>
                            <SelectItem value="Lunch">Lunch</SelectItem>
                            <SelectItem value="Snack">Snack</SelectItem>
                          </SelectContent>
                        </Select>

                        <ViewToggle view={view} onViewChange={setView} />

                        {(selectedAgeGroup || selectedMealType !== 'all' || searchQuery) && (
                          <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAgeGroup(null);
                              setSelectedMealType('all');
                              setSearchQuery('');
                            }}
                          >
                            <FilterX className="h-4 w-4 mr-2" />
                            Clear
                          </Button>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {['0-1', '1-2', '2-3', '3-4', '4-5'].map(age => (
                          <Badge
                            key={age}
                            variant={selectedAgeGroup === age ? "default" : "outline"}
                            className="cursor-pointer hover:bg-secondary/80 transition-colors"
                            onClick={() => setSelectedAgeGroup(selectedAgeGroup === age ? null : age)}
                          >
                            {age}y
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className={view === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      : "space-y-4"
                    }
                  >
                    {filteredItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MenuItemCard 
                          item={item}
                          view={view}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="planner" className="mt-0 border-t pt-6">
                <MenuTemplates
                  availableMenuItems={menuItems}
                  onUseTemplate={handleUseTemplate}
                  setActiveTab={forceTabUpdate}
                />
              </TabsContent>
              
              <TabsContent value="cycles" className="mt-0 border-t pt-6">
                <MenuCycles 
                  templates={templates}
                  availableMenuItems={menuItems}
                />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </MainLayout>
    </div>
  );
};

export default MenuManagement;
