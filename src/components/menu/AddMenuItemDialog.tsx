import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { MenuItem } from '@/types/menu';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ageGroups = ['0-1', '1-2', '2-3', '3-4', '4-5'];
const nutritionTags = ['Protein', 'Fiber', 'Vitamin A', 'Vitamin C', 'Vitamin B', 'Calcium', 'Iron', 'Omega-3', 'Probiotics'];
const allergens = ['None', 'Dairy', 'Eggs', 'Fish', 'Gluten', 'Nuts', 'Soy'];
const dietaryOptions = ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'];
const mealTypes = ['Breakfast', 'Lunch', 'Snack'];

interface MenuItemFormData {
  name: string;
  mealType: string;
  ageGroups: string[];
  nutritionTags: string[];
  allergens: string[];
  dietary: string[];
  image: string;
}

interface AddMenuItemDialogProps {
  mode?: 'create' | 'edit';
  menuItem?: MenuItem;
  children?: React.ReactNode;
}

export function AddMenuItemDialog({ mode = 'create', menuItem, children }: AddMenuItemDialogProps) {
  const form = useForm<MenuItemFormData>({
    defaultValues: mode === 'edit' ? {
      name: menuItem?.name,
      mealType: menuItem?.mealType,
      ageGroups: menuItem?.ageGroups,
      nutritionTags: menuItem?.nutritionTags,
      allergens: menuItem?.allergens,
      dietary: menuItem?.dietary,
      image: menuItem?.image,
    } : undefined
  });
  const { toast } = useToast();

  const onSubmit = (data: MenuItemFormData) => {
    const newMenuItem: MenuItem = {
      id: mode === 'edit' ? menuItem!.id : Date.now(),
      ...data
    };
    
    console.log(mode === 'edit' ? 'Updated menu item:' : 'New menu item:', newMenuItem);
    toast({
      title: mode === 'edit' ? "Menu Item Updated" : "Menu Item Created",
      description: `${data.name} has been ${mode === 'edit' ? 'updated' : 'added'} to the menu items.`
    });
    
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button size="sm" className="flex items-center gap-1">
            <PlusCircle size={14} />
            <span>Add Menu Item</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter item name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter image URL" type="url" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="mealType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      {mealTypes.map(type => (
                        <FormItem key={type} className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal">{type}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Tabs defaultValue="ageGroups" className="w-full">
              <TabsList className="grid grid-cols-4 mb-2">
                <TabsTrigger value="ageGroups">Age Groups</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="allergens">Allergens</TabsTrigger>
                <TabsTrigger value="dietary">Dietary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ageGroups" className="space-y-4">
                <FormField
                  control={form.control}
                  name="ageGroups"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2">
                        {ageGroups.map((age) => (
                          <FormItem key={age} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(age)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValue, age])
                                    : field.onChange(currentValue.filter((value) => value !== age));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">{age} years</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="nutrition" className="space-y-4">
                <FormField
                  control={form.control}
                  name="nutritionTags"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2">
                        {nutritionTags.map((tag) => (
                          <FormItem key={tag} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValue, tag])
                                    : field.onChange(currentValue.filter((value) => value !== tag));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">{tag}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="allergens" className="space-y-4">
                <FormField
                  control={form.control}
                  name="allergens"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2">
                        {allergens.map((allergen) => (
                          <FormItem key={allergen} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(allergen)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValue, allergen])
                                    : field.onChange(currentValue.filter((value) => value !== allergen));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">{allergen}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="dietary" className="space-y-4">
                <FormField
                  control={form.control}
                  name="dietary"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-3 gap-2">
                        {dietaryOptions.map((option) => (
                          <FormItem key={option} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValue, option])
                                    : field.onChange(currentValue.filter((value) => value !== option));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">{option}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <DialogFooter className="pt-2">
              <Button type="submit">Create Menu Item</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
