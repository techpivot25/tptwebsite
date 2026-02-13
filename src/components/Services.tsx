import { Link } from "react-router-dom";
import { Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Users, Boxes, Cpu, Lightbulb, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const services = [
  { 
    icon: Bot, 
    title: "Agentic AI", 
    subtitle: "Autonomous Intelligence",
    description: "Autonomous systems that perceive, reason, plan, and execute complex tasks.", 
    href: "/services/agentic-ai",
    gradient: "from-violet-500/10 to-purple-500/10"
  },
  { 
    icon: Sparkles, 
    title: "Generative AI", 
    subtitle: "Creative Solutions",
    description: "Advanced tools for content generation and design automation.", 
    href: "/services/generative-ai",
    gradient: "from-pink-500/10 to-rose-500/10"
  },
  { 
    icon: Cloud, 
    title: "SaaS Platform", 
    subtitle: "Cloud Native",
    description: "Secure, cloud-native applications with robust APIs.", 
    href: "/services/saas-platform",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  { 
    icon: Globe, 
    title: "Web Development", 
    subtitle: "Modern Frameworks",
    description: "High-performing, SEO-optimized sites with modern frameworks.", 
    href: "/services/web-development",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  { 
    icon: Smartphone, 
    title: "Mobile Apps", 
    subtitle: "iOS & Android",
    description: "Native and cross-platform iOS/Android applications.", 
    href: "/services/mobile-app",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  { 
    icon: Shield, 
    title: "Cloud & Security", 
    subtitle: "Enterprise Grade",
    description: "Scalable cloud architectures with enterprise security.", 
    href: "/services/cloud-security",
    gradient: "from-red-500/10 to-orange-500/10"
  },
  { 
    icon: Users, 
    title: "Staff Augmentation", 
    subtitle: "Expert Teams",
    description: "On-demand expert teams to scale your projects.", 
    href: "/services/staff-augmentation",
    gradient: "from-indigo-500/10 to-blue-500/10"
  },
  { 
    icon: Boxes, 
    title: "Custom Software", 
    subtitle: "Tailored Solutions",
    description: "Tailored software solutions built around your unique business.", 
    href: "/services/custom-software",
    gradient: "from-fuchsia-500/10 to-pink-500/10"
  },
  { 
    icon: Cpu, 
    title: "IoT Solutions", 
    subtitle: "Connected Devices",
    description: "Connected device ecosystems with intelligent automation.", 
    href: "/services/iot",
    gradient: "from-cyan-500/10 to-blue-500/10"
  },
  { 
    icon: Lightbulb, 
    title: "Consultancy", 
    subtitle: "Strategic Guidance",
    description: "Strategic technology consulting for digital transformation.", 
    href: "/services/consultancy",
    gradient: "from-yellow-500/10 to-orange-500/10"
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  return (
    <AnimatedSection
      animation="fadeUp"
      delay={index * 50}
    >
      <Link 
        to={service.href} 
        className="group block h-full"
      >
        <motion.div 
          className="relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-6 overflow-hidden transition-all duration-500"
          whileHover={{ 
            y: -8,
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
          }}
        >
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Title at top - Apple style */}
            <div className="mb-auto">
              <h3 className="text-xl font-semibold text-foreground mb-1 tracking-tight">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.subtitle}
              </p>
            </div>

            {/* Icon in center - larger, more prominent */}
            <div className="flex justify-center py-8">
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-background/80 dark:bg-background/50 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <service.icon className="w-10 h-10 text-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
              </motion.div>
            </div>

            {/* Description at bottom */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Learn more link - Apple style */}
            <div className="flex items-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Learn more</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </AnimatedSection>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-0 w-64 h-64 border border-border/50 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-0 w-48 h-48 border border-primary/20 rounded-full opacity-50" />

      <div className="container px-6 lg:px-12 relative z-10">
        {/* Section Header - Apple style */}
        <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16 -mt-[100px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Services We Deliver
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive technology solutions tailored to your business needs.
          </p>
        </AnimatedSection>

        {/* Services Grid - Apple-inspired layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
