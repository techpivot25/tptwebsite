import { Link } from "react-router-dom";
import { Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Users, Boxes, Cpu, Lightbulb, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Bot, title: "Agentic AI", description: "Autonomous systems that perceive, reason, plan, and execute complex tasks.", href: "/services/agentic-ai" },
  { icon: Sparkles, title: "Generative AI", description: "Advanced tools for content generation and design automation.", href: "/services/generative-ai" },
  { icon: Cloud, title: "SaaS Platform", description: "Secure, cloud-native applications with robust APIs.", href: "/services/saas-platform" },
  { icon: Globe, title: "Web Development", description: "High-performing, SEO-optimized sites with modern frameworks.", href: "/services/web-development" },
  { icon: Smartphone, title: "Mobile Apps", description: "Native and cross-platform iOS/Android applications.", href: "/services/mobile-app" },
  { icon: Shield, title: "Cloud & Security", description: "Scalable cloud architectures with enterprise security.", href: "/services/cloud-security" },
  { icon: Users, title: "Staff Augmentation", description: "On-demand expert teams to scale your projects.", href: "/services/staff-augmentation" },
  { icon: Boxes, title: "End-to-End Delivery", description: "Complete project lifecycle management and delivery.", href: "/services/custom-software" },
  { icon: Cpu, title: "IoT Solutions", description: "Connected device ecosystems with intelligent automation.", href: "/services/iot" },
  { icon: Lightbulb, title: "Consultancy", description: "Strategic technology consulting for digital transformation.", href: "/services/consultancy" },
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 border border-border/50 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-0 w-48 h-48 border border-primary/20 rounded-full opacity-50" />

      <div className="container px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            KEY BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mt-4 mb-6 text-foreground">
            What We Deliver
          </h2>
          <p className="text-lg text-muted-foreground">
            From AI-powered automation to enterprise-grade cloud solutions, we deliver end-to-end services that drive digital transformation.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              to={service.href} 
              className="group relative p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              
              <div className="relative z-10">
                {/* Icon with thin stroke style */}
                <div className="w-12 h-12 rounded-lg border border-border bg-background flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
                </div>

                {/* Title with arrow */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;