
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, GripHorizontal } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { AddMenuItemDialog } from './AddMenuItemDialog';
// Removed NutritionAnalysis import

interface MenuItemCardProps {
  item: MenuItem;
  view?: 'grid' | 'list';
  draggable?: boolean;
}

export function MenuItemCard({ item, view = 'grid', draggable = false }: MenuItemCardProps) {
  if (view === 'list') {
    return (
      <Card className="group hover:shadow-md transition-all duration-300">
        <div className="flex items-center p-4 gap-4">
          {draggable && (
            <GripHorizontal className="h-5 w-5 text-muted-foreground cursor-move" />
          )}
          <div className="h-16 w-16 relative overflow-hidden rounded-md flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 min-w-0 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.mealType}</p>
            </div>
            <AddMenuItemDialog mode="edit" menuItem={item}>
              <Button size="icon" variant="ghost" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </AddMenuItemDialog>
          </div>
        </div>
        <div className="px-4 pb-4 flex flex-wrap gap-1">
          {item.nutritionTags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="object-cover w-full h-full transition-all group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <AddMenuItemDialog mode="edit" menuItem={item}>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
          </AddMenuItemDialog>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-base">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.mealType}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {item.ageGroups.map(age => (
            <Badge key={age} variant="outline" className="text-xs">
              {age}y
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 px-4 pb-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {item.nutritionTags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

