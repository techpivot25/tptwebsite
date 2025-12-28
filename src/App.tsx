import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React, { Suspense, useEffect, useState } from "react";
import { isLowPerfDevice } from "@/lib/utils";
const Index = React.lazy(() => import("./pages/Index"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Technologies = React.lazy(() => import("./pages/Technologies"));
const Careers = React.lazy(() => import("./pages/Careers"));
const About = React.lazy(() => import("./pages/About"));
const AgenticAI = React.lazy(() => import("./pages/services/AgenticAI"));
const GenerativeAI = React.lazy(() => import("./pages/services/GenerativeAI"));
const SaaSPlatform = React.lazy(() => import("./pages/services/SaaSPlatform"));
const WebDevelopment = React.lazy(() => import("./pages/services/WebDevelopment"));
const MobileApp = React.lazy(() => import("./pages/services/MobileApp"));
const CloudSecurity = React.lazy(() => import("./pages/services/CloudSecurity"));
const CustomSoftware = React.lazy(() => import("./pages/services/CustomSoftware"));
const StaffAugmentation = React.lazy(() => import("./pages/services/StaffAugmentation"));
const IoT = React.lazy(() => import("./pages/services/IoT"));
const Consultancy = React.lazy(() => import("./pages/services/Consultancy"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
const ChatBot = React.lazy(() => import("./components/ChatBot"));
const RainbowCursor = React.lazy(() => import("./components/RainbowCursor"));
import SmoothScroll from "./components/SmoothScroll";
const AnimatedCanvasBackground = React.lazy(() => import("./components/AnimatedCanvasBackground"));

const queryClient = new QueryClient();

const App = () => {
  const [lowPerf, setLowPerf] = useState(false);
  useEffect(() => {
    const lp = isLowPerfDevice();
    setLowPerf(lp);
    document.body.classList.toggle("lowperf", lp);
    if (lp) {
      console.info("Low-perf mode enabled: heavy visuals disabled. Set ?effects=on or localStorage 'tp-effects'='on' to override.");
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {!lowPerf && (
            <div className="fixed inset-0 w-full h-screen z-0 pointer-events-none">
              <Suspense fallback={null}>
                <AnimatedCanvasBackground />
              </Suspense>
            </div>
          )}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-background text-foreground px-3 py-2 rounded-md border"
          >
            Skip to content
          </a>
          <div className="relative z-10">
            {!lowPerf && (
              <Suspense fallback={null}>
                <RainbowCursor />
              </Suspense>
            )}
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTopOnNavigate />
              <SmoothScroll>
                <Suspense fallback={<div className="p-6">Loading…</div>}>
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
                </Suspense>
                <WhatsAppButton />
                <ScrollToTop />
                <Suspense fallback={null}>
                  <ChatBot />
                </Suspense>
              </SmoothScroll>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
