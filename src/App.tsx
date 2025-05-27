import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MenuManagement from "./pages/MenuManagement";
import Logistics from "./pages/Logistics";
import Reports from "./pages/Reports";
import Communications from "./pages/Communications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TaggingSystem from "./pages/TaggingSystem";
import DistributionOperations from "./pages/DistributionOperations";
import Guide from "./pages/Guide";

// Import new Nursery System pages
import NurseryPortalIndex from "./pages/nursery/Index";
import ParentPortal from "./pages/nursery/ParentPortal";
import TeacherPortal from "./pages/nursery/TeacherPortal";
import PrincipalPortal from "./pages/nursery/PrincipalPortal";
import HeadOfficePortal from "./pages/nursery/HeadOfficePortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/nutrio/">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/production" element={<Logistics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tagging" element={<TaggingSystem />} />
          <Route path="/distribution" element={<DistributionOperations />} />
          <Route path="/guide" element={<Guide />} />

          {/* New Nursery Management System routes */}
          <Route path="/nursery" element={<NurseryPortalIndex />} />
          <Route path="/nursery/parent" element={<ParentPortal />} />
          <Route path="/nursery/teacher" element={<TeacherPortal />} />
          <Route path="/nursery/principal" element={<PrincipalPortal />} />
          <Route path="/nursery/head-office" element={<HeadOfficePortal />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
