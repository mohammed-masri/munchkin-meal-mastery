
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { PackingOperations } from '@/components/logistics/PackingOperations';
import { ContainerPacking } from '@/components/logistics/ContainerPacking';
import { MealDistribution } from '@/components/logistics/MealDistribution';
import { DeliveryOperations } from '@/components/logistics/DeliveryOperations';
import { DeliveryStatus } from '@/components/logistics/DeliveryStatus';
import { DateRangePicker } from '@/components/logistics/DateRangePicker';
import { BulkLabelPrinting } from '@/components/logistics/BulkLabelPrinting';

const DistributionOperations = () => {
  const [activeTab, setActiveTab] = useState('packing');
  const [date, setDate] = useState<Date>(new Date());

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Distribution Operations
            </h1>
            <p className="text-lg text-muted-foreground">
              Pack, label, and manage meal deliveries efficiently
            </p>
          </div>
          
          <DateRangePicker date={date} setDate={setDate} />
        </motion.div>

        <BulkLabelPrinting />

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-4 gap-4 bg-transparent p-1">
              {[
                { value: 'packing', label: 'Child Meal Packing' },
                { value: 'containers', label: 'Container Management' },
                { value: 'distribution', label: 'Distribution' },
                { value: 'delivery', label: 'Delivery' }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-6"
          >
            <TabsContent value="packing" className="m-0">
              <PackingOperations date={date} />
            </TabsContent>

            <TabsContent value="containers" className="m-0">
              <ContainerPacking date={date} />
            </TabsContent>

            <TabsContent value="distribution" className="m-0">
              <MealDistribution date={date} />
            </TabsContent>

            <TabsContent value="delivery" className="m-0">
              <div className="grid grid-cols-1 gap-6">
                <DeliveryOperations date={date} />
                <DeliveryStatus date={date} />
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default DistributionOperations;
