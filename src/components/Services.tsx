import { Link } from "react-router-dom";
import { Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Users, Boxes, Cpu, Code, Lightbulb, ArrowRight } from "lucide-react";

const services = [
  { icon: Bot, title: "AI Agent Development", description: "Autonomous systems that perceive, reason, plan, and execute.", href: "/services/agentic-ai" },
  { icon: Sparkles, title: "Generative AI", description: "Advanced tools for content generation and design automation.", href: "/services/generative-ai" },
  { icon: Cloud, title: "SaaS Platform Development", description: "Secure, cloud-native apps with APIs and microservices.", href: "/services/saas-platform" },
  { icon: Globe, title: "Website Development", description: "High-performing, SEO-optimized sites with modern frameworks.", href: "/services/web-development" },
  { icon: Smartphone, title: "Mobile App Development", description: "Native and cross-platform iOS/Android apps.", href: "/services/mobile-app" },
  { icon: Shield, title: "Cloud & Security", description: "Scalable cloud architectures with cybersecurity.", href: "/services/cloud-security" },
  { icon: Users, title: "IT Staff Augmentation", description: "On-demand expert teams to scale your projects.", href: "/services/staff-augmentation" },
  { icon: Boxes, title: "End-to-End Delivery", description: "GCC-enabled resource planning for global scalability.", href: "/services/custom-software" },
  { icon: Cpu, title: "IoT Solutions", description: "Connected device ecosystems with intelligent automation.", href: "/services/iot" },
  { icon: Code, title: "Custom Software Development", description: "Tailored software for your unique requirements.", href: "/services/custom-software" },
  { icon: Lightbulb, title: "Software Consultancy", description: "Strategic technology consulting for digital transformation.", href: "/services/consultancy" },
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-to-b from-secondary/10 to-accent/5">
      <div className="container px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            <span className="text-foreground">Comprehensive </span>
            <span className="text-foreground">Technology Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">From AI-powered automation to enterprise-grade cloud solutions, we deliver end-to-end services that drive digital transformation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link 
              key={service.title} 
              to={service.href} 
              className="group p-6 bg-card rounded-xl border border-border/50 hover-lift cursor-pointer block relative overflow-hidden"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {service.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;