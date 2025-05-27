
export interface MenuItem {
  id: number;
  name: string;
  ageGroups: string[];
  mealType: string;
  nutritionTags: string[];
  allergens: string[];
  dietary: string[];
  image: string;
}

export interface MenuSlot {
  day: string;
  mealType: string;
  menuItem: MenuItem | null;
}

export interface MenuTemplate {
  id: number;
  name: string;
  description: string;
  slots: Record<string, Record<string, MenuItem | null>>;
}

export interface MenuCycle {
  id: number;
  name: string;
  duration: string;
  startDate: Date;
  status: 'active' | 'draft';
  template?: MenuTemplate;
}
