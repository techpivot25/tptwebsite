import { Smartphone, Apple, Play, Layers, Zap, Shield, Wifi, Server, ShoppingCart, Heart, MapPin, MessageCircle, Users, Briefcase } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact, AppleCardFeature } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const platforms = [
  { icon: Apple, title: "iOS Development", description: "Native iOS apps built with Swift and SwiftUI for optimal performance" },
  { icon: Play, title: "Android Development", description: "Native Android apps using Kotlin and Jetpack Compose" },
  { icon: Layers, title: "Cross-Platform", description: "React Native and Flutter apps from a single codebase" },
  { icon: Wifi, title: "Progressive Web Apps", description: "Web apps that work offline with app-like experiences" },
];

const features = [
  { icon: Zap, title: "High Performance", description: "Optimized code and efficient architecture for fast, responsive apps" },
  { icon: Shield, title: "Enterprise Security", description: "Bank-grade security with encryption and authentication" },
  { icon: Wifi, title: "Offline Support", description: "Apps that work seamlessly even without internet" },
  { icon: Server, title: "Scalable Backend", description: "Cloud infrastructure that scales with your user base" },
];

const solutions = [
  { icon: ShoppingCart, title: "E-Commerce Apps", description: "Full-featured mobile shopping with secure payments and personalized recommendations" },
  { icon: Heart, title: "Healthcare Apps", description: "HIPAA-compliant health apps with telemedicine and patient monitoring" },
  { icon: MapPin, title: "On-Demand Services", description: "Real-time tracking, matching algorithms, and payment integration" },
  { icon: MessageCircle, title: "Social & Media Apps", description: "Engaging social features, content sharing, and live streaming" },
  { icon: Users, title: "Communication Apps", description: "Real-time messaging, video calls, and collaboration features" },
  { icon: Briefcase, title: "Enterprise Apps", description: "Custom business apps for workforce and field operations" },
];

const MobileApp = () => {
  return (
    <ServicePageLayout
      title="Mobile App Development"
      subtitle="Native & Cross-Platform"
      description="Develop secure, scalable, and high-performance mobile applications tailored for enterprise needs with native and cross-platform expertise."
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
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {solutions.map((solution, index) => (
              <div key={solution.title} className="min-w-[300px] max-w-[300px] snap-start flex-shrink-0">
                <AnimatedSection animation="fadeUp" delay={index * 100}>
                  <AppleCardCompact
                    icon={solution.icon}
                    title={solution.title}
                    description={solution.description}
                  />
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default MobileApp;
