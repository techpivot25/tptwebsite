import { Smartphone, Apple, Play, Layers, Zap, Shield, Wifi, Server, ShoppingCart, Heart, MapPin, MessageCircle, Users, Briefcase } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact, AppleCardFeature } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const platforms = [
  { icon: Apple, title: "Native iOS Development", description: "Premium iOS applications built with Swift 5.9+ and SwiftUI for exceptional performance, native UI components, and full access to latest Apple platform features and APIs" },
  { icon: Play, title: "Native Android Development", description: "High-performance Android apps using Kotlin, Jetpack Compose, and Material Design 3 with support for the latest Android features and backward compatibility" },
  { icon: Layers, title: "Cross-Platform Development", description: "Build once, deploy everywhere with React Native or Flutter. Share 70-90% code between iOS and Android while maintaining native look, feel, and performance" },
  { icon: Wifi, title: "Progressive Web Apps (PWA)", description: "Modern web applications with app-like experiences, offline functionality, push notifications, home screen installation, and cross-platform compatibility without app store distribution" },
];

const features = [
  { icon: Zap, title: "High Performance", description: "Optimized code and efficient architecture for fast, responsive apps" },
  { icon: Shield, title: "Enterprise Security", description: "Bank-grade security with encryption and authentication" },
  { icon: Wifi, title: "Offline Support", description: "Apps that work seamlessly even without internet" },
  { icon: Server, title: "Scalable Backend", description: "Cloud infrastructure that scales with your user base" },
];

const solutions = [
  { icon: ShoppingCart, title: "E-Commerce Mobile Apps", description: "Feature-rich shopping apps with product catalogs, AR try-on, barcode scanning, one-click checkout, order tracking, push notifications for deals, personalized recommendations, and loyalty programs" },
  { icon: Heart, title: "Healthcare & Wellness Apps", description: "HIPAA-compliant health apps with telemedicine video consultations, electronic health records (EHR), appointment booking, prescription management, health tracking, wearable integration, and secure patient-doctor messaging" },
  { icon: MapPin, title: "On-Demand Service Apps", description: "Uber-like platforms with real-time GPS tracking, intelligent matching algorithms, in-app payments, driver/customer ratings, route optimization, fare calculation, and multi-service support" },
  { icon: MessageCircle, title: "Social & Media Apps", description: "Engaging social platforms with user profiles, feeds, stories, live streaming, video/photo sharing, comments, likes, hashtags, real-time messaging, and content moderation" },
  { icon: Users, title: "Enterprise Communication Apps", description: "Real-time messaging, video/audio conferencing, screen sharing, file sharing, team channels, presence indicators, end-to-end encryption, and integrations with business tools (Slack, Teams alternatives)" },
  { icon: Briefcase, title: "Field Service & Enterprise Apps", description: "Custom workforce management apps with offline data collection, mobile forms, digital signatures, barcode scanning, asset tracking, route planning, time tracking, and ERP/CRM integration" },
];

const MobileApp = () => {
  return (
    <ServicePageLayout
      title="Mobile App Development"
      subtitle="Native & Cross-Platform"
      description="Develop secure, scalable, and high-performance mobile applications tailored for enterprise needs with native and cross-platform expertise. We build iOS apps with Swift, Android apps with Kotlin, and cross-platform solutions with React Native and Flutter for maximum reach and code efficiency."
      icon={<Smartphone className="w-8 h-8 text-primary" />}
    >
      {/* Platforms */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platforms We Build For
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <AnimatedSection key={platform.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={platform.icon}
                  title={platform.title}
                  description={platform.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Features
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry Solutions
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default MobileApp;
