import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";

// Eagerly load the Index page for fast initial render
import Index from "./pages/Index";

// Lazy load all other pages to reduce initial bundle size
const Contact = lazy(() => import("./pages/Contact"));
const Technologies = lazy(() => import("./pages/Technologies"));
const Careers = lazy(() => import("./pages/Careers"));
const About = lazy(() => import("./pages/About"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const BlogEditor = lazy(() => import("./pages/admin/BlogEditor"));
const BlogAnalytics = lazy(() => import("./pages/admin/BlogAnalytics"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword"));
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
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import ChatBot from "./components/ChatBot";

const queryClient = new QueryClient();

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.35,
};

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blog/:id" element={<BlogEditor />} />
            <Route path="/admin/analytics" element={<BlogAnalytics />} />
            <Route path="/admin/reset-password" element={<ResetPassword />} />
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
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNavigate />
          <AnimatedRoutes />
          <WhatsAppButton />
          <ScrollToTop />
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
