
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

const Communications = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
          <p className="text-muted-foreground mt-1">
            Manage parent communications and feedback
          </p>
        </div>
        
        <div className="p-8 text-center bg-muted/50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Communication Tools</h3>
          <p className="text-muted-foreground mb-4">
            This page will contain parent communication features.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Communications;
