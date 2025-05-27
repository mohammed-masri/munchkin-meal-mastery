
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

const AttendancePage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage daily attendance for meal planning
          </p>
        </div>
        
        <div className="p-8 text-center bg-muted/50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Attendance Tracking</h3>
          <p className="text-muted-foreground mb-4">
            This page will contain attendance tracking features.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AttendancePage;
