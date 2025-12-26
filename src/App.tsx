import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Technologies from "./pages/Technologies";
import Careers from "./pages/Careers";
import About from "./pages/About";
import AgenticAI from "./pages/services/AgenticAI";
import GenerativeAI from "./pages/services/GenerativeAI";
import SaaSPlatform from "./pages/services/SaaSPlatform";
import WebDevelopment from "./pages/services/WebDevelopment";
import MobileApp from "./pages/services/MobileApp";
import CloudSecurity from "./pages/services/CloudSecurity";
import CustomSoftware from "./pages/services/CustomSoftware";
import StaffAugmentation from "./pages/services/StaffAugmentation";
import IoT from "./pages/services/IoT";
import Consultancy from "./pages/services/Consultancy";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/services/agentic-ai" element={<AgenticAI />} />
            <Route path="/services/generative-ai" element={<GenerativeAI />} />
            <Route path="/services/saas-platform" element={<SaaSPlatform />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/mobile-app" element={<MobileApp />} />
            <Route path="/services/cloud-security" element={<CloudSecurity />} />
            <Route path="/services/custom-software" element={<CustomSoftware />} />
            <Route path="/services/staff-augmentation" element={<StaffAugmentation />} />
            <Route path="/services/iot" element={<IoT />} />
            <Route path="/services/consultancy" element={<Consultancy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
          <ScrollToTop />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
