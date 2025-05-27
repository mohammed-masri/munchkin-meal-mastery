
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info } from 'lucide-react';

export function NutritionAlerts() {
  // Mock data for nutrition alerts
  const alerts = [
    {
      id: 1,
      childName: 'Emma Davis',
      nursery: 'Al Badee Nursery',
      alertType: 'allergen',
      message: 'Has peanut allergy - alternative snack required',
      severity: 'high'
    },
    {
      id: 2,
      childName: 'Noah Smith',
      nursery: 'Al Qulayaa Nursery',
      alertType: 'diet',
      message: 'Vegetarian diet - ensure meat-free lunch option is available',
      severity: 'medium'
    },
    {
      id: 3,
      childName: 'Sophia Wilson',
      nursery: 'Maleha Nursery',
      alertType: 'allergen',
      message: 'Gluten sensitivity - needs gluten-free alternatives',
      severity: 'high'
    },
    {
      id: 4,
      childName: 'Oliver Johnson',
      nursery: 'Al Badee Nursery',
      alertType: 'nutrition',
      message: 'Low iron levels - recommend iron-rich foods',
      severity: 'medium'
    },
    {
      id: 5,
      childName: 'Mia Thompson',
      nursery: 'Kalba Nursery',
      alertType: 'allergen',
      message: 'Dairy allergy - provide non-dairy milk option',
      severity: 'high'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          Nutrition Alerts
        </CardTitle>
        <CardDescription>
          Special dietary needs and restrictions requiring attention
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className="p-3 rounded-lg bg-background border flex items-start gap-3">
              <div className={`shrink-0 p-1.5 rounded-full ${
                alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {alert.severity === 'high' ? (
                  <AlertTriangle size={16} />
                ) : (
                  <Info size={16} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{alert.childName}</h4>
                  <Badge variant="outline" className="text-xs">
                    {alert.nursery}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
