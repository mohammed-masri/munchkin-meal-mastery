
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MenuItem } from '@/types/menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical, MenuSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ViewToggle } from './ViewToggle';

interface MenuItemsSidebarProps {
  items: MenuItem[];
  droppableId: string;
  onSearch?: (query: string) => void;
  onFilterChange?: (filter: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
  view?: 'grid' | 'list';
}

export function MenuItemsSidebar({ 
  items, 
  droppableId,
  onSearch,
  onFilterChange,
  onViewChange,
  view = 'grid'
}: MenuItemsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (onFilterChange) onFilterChange(value);
  };

  return (
    <Card className="w-80 flex-shrink-0 border shadow-sm">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MenuSquare className="h-5 w-5 text-slate-500" />
          <h3 className="font-medium">Menu Building Blocks</h3>
        </div>
        
        <div className="flex flex-row items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              className="pl-9"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <Select defaultValue={filter} onValueChange={handleFilterChange}>
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
          
          {onViewChange && (
            <ViewToggle view={view} onViewChange={onViewChange} />
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="space-y-3 pr-4">
            {items.map((item, index) => (
              <Draggable key={`item-${item.id}`} draggableId={`item-${item.id}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="p-3 bg-white rounded-md border shadow-sm hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        {...provided.dragHandleProps}
                        className="text-gray-400 hover:text-gray-600 cursor-grab"
                      >
                        <GripVertical size={16} />
                      </div>
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
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
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}
