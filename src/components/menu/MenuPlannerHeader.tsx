
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Eye, ArrowLeft, Save } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { format, startOfWeek, endOfWeek } from 'date-fns';

interface MenuPlannerHeaderProps {
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
  templateName: string;
  onBack: () => void;
  onSave: () => void;
}

export function MenuPlannerHeader({
  currentWeek,
  setCurrentWeek,
  templateName,
  onBack,
  onSave
}: MenuPlannerHeaderProps) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekRange = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-highlight p-4 rounded-lg">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{templateName}</h2>
        </div>
        <Button onClick={onSave} className="bg-success hover:bg-success/90 text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>

      <div className="flex justify-between items-center py-2 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentWeek);
              newDate.setDate(newDate.getDate() - 7);
              setCurrentWeek(newDate);
            }}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted" />
            <span className="font-medium">{weekRange}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentWeek);
              newDate.setDate(newDate.getDate() + 7);
              setCurrentWeek(newDate);
            }}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <DatePicker
            date={currentWeek}
            setDate={(date) => date && setCurrentWeek(date)}
          />
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
