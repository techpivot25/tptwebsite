import { Smartphone, Apple, Play, Layers, Zap, Shield, Wifi, Server, ShoppingCart, Heart, MapPin, MessageCircle, Users, Briefcase } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Platforms We Build For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform) => (
              <div key={platform.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <platform.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{platform.title}</h3>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Enterprise-Grade Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 bg-card rounded-xl border border-border/50 text-center">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Industry Solutions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div key={solution.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default MobileApp;
