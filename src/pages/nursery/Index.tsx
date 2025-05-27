
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { User, Users, School, Building, BuildingIcon } from 'lucide-react';

const NurseryPortalIndex = () => {
  const roleCards = [
    {
      title: 'Parent Portal',
      description: 'Access your child\'s meal plans, attendance, and communicate with teachers',
      icon: <User className="h-8 w-8 text-primary" />,
      path: '/nursery/parent',
      color: 'bg-soft-blue'
    },
    {
      title: 'Teacher Portal',
      description: 'Manage classroom meal distribution, record attendance, and special requirements',
      icon: <Users className="h-8 w-8 text-primary" />,
      path: '/nursery/teacher',
      color: 'bg-soft-green'
    },
    {
      title: 'Principal Portal',
      description: 'Oversee nursery operations, review reports, and manage staff',
      icon: <School className="h-8 w-8 text-primary" />,
      path: '/nursery/principal',
      color: 'bg-soft-orange'
    },
    {
      title: 'Head Office Portal',
      description: 'View and manage all nurseries in the network with comprehensive oversight',
      icon: <Building className="h-8 w-8 text-primary" />,
      path: '/nursery/head-office',
      color: 'bg-soft-purple'
    }
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nursery Management System</h1>
          <p className="text-muted-foreground mt-1">
            Select a portal to access specific nursery management features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roleCards.map((card) => (
            <Card key={card.title} className="hover:shadow-md transition-all duration-300">
              <CardHeader className={`${card.color} bg-opacity-10 rounded-t-lg`}>
                <div className="flex items-center gap-3">
                  {card.icon}
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <Button asChild className="w-full">
                  <Link to={card.path}>Enter Portal</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default NurseryPortalIndex;
