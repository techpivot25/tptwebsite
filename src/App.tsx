import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import ChatBot from "./components/ChatBot";

// Lazy load non-critical pages for code splitting
const Contact = lazy(() => import("./pages/Contact"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Careers = lazy(() => import("./pages/Careers"));
const About = lazy(() => import("./pages/About"));
const AgenticAI = lazy(() => import("./pages/services/AgenticAI"));
const GenerativeAI = lazy(() => import("./pages/services/GenerativeAI"));
const SaaSPlatform = lazy(() => import("./pages/services/SaaSPlatform"));
const WebDevelopment = lazy(() => import("./pages/services/WebDevelopment"));
const MobileApp = lazy(() => import("./pages/services/MobileApp"));
const CloudSecurity = lazy(() => import("./pages/services/CloudSecurity"));
const CustomSoftware = lazy(() => import("./pages/services/CustomSoftware"));
const StaffAugmentation = lazy(() => import("./pages/services/StaffAugmentation"));
const IoT = lazy(() => import("./pages/services/IoT"));
const Consultancy = lazy(() => import("./pages/services/Consultancy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AnimationsDemo = lazy(() => import("./pages/AnimationsDemo"));

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/animations" element={<AnimationsDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
          <ScrollToTop />
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
