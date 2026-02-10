import { Link } from "react-router-dom";
import { Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Users, Boxes, Cpu, Lightbulb, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  { 
    icon: Bot, 
    titleKey: "services.agenticAI",
    subtitleKey: "services.agenticAI.subtitle",
    descKey: "services.agenticAI.desc",
    href: "/services/agentic-ai",
    gradient: "from-violet-500/10 to-purple-500/10"
  },
  { 
    icon: Sparkles, 
    titleKey: "services.generativeAI",
    subtitleKey: "services.generativeAI.subtitle",
    descKey: "services.generativeAI.desc",
    href: "/services/generative-ai",
    gradient: "from-pink-500/10 to-rose-500/10"
  },
  { 
    icon: Cloud, 
    titleKey: "services.saas",
    subtitleKey: "services.saas.subtitle",
    descKey: "services.saas.desc",
    href: "/services/saas-platform",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  { 
    icon: Globe, 
    titleKey: "services.webDev",
    subtitleKey: "services.webDev.subtitle",
    descKey: "services.webDev.desc",
    href: "/services/web-development",
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  { 
    icon: Smartphone, 
    titleKey: "services.mobileApp",
    subtitleKey: "services.mobileApp.subtitle",
    descKey: "services.mobileApp.desc",
    href: "/services/mobile-app",
    gradient: "from-orange-500/10 to-amber-500/10"
  },
  { 
    icon: Shield, 
    titleKey: "services.cloudSecurity",
    subtitleKey: "services.cloudSecurity.subtitle",
    descKey: "services.cloudSecurity.desc",
    href: "/services/cloud-security",
    gradient: "from-red-500/10 to-orange-500/10"
  },
  { 
    icon: Users, 
    titleKey: "services.staffAug",
    subtitleKey: "services.staffAug.subtitle",
    descKey: "services.staffAug.desc",
    href: "/services/staff-augmentation",
    gradient: "from-indigo-500/10 to-blue-500/10"
  },
  { 
    icon: Boxes, 
    titleKey: "services.customSoftware",
    subtitleKey: "services.customSoftware.subtitle",
    descKey: "services.customSoftware.desc",
    href: "/services/custom-software",
    gradient: "from-fuchsia-500/10 to-pink-500/10"
  },
  { 
    icon: Cpu, 
    titleKey: "services.iot",
    subtitleKey: "services.iot.subtitle",
    descKey: "services.iot.desc",
    href: "/services/iot",
    gradient: "from-cyan-500/10 to-blue-500/10"
  },
  { 
    icon: Lightbulb, 
    titleKey: "services.consultancy",
    subtitleKey: "services.consultancy.subtitle",
    descKey: "services.consultancy.desc",
    href: "/services/consultancy",
    gradient: "from-yellow-500/10 to-orange-500/10"
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { t } = useLanguage();

  return (
    <AnimatedSection animation="fadeUp" delay={index * 50}>
      <Link to={service.href} className="group block h-full">
        <motion.div 
          className="relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-6 overflow-hidden transition-all duration-500"
          whileHover={{ 
            y: -8,
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-auto">
              <h3 className="text-xl font-semibold text-foreground mb-1 tracking-tight">
                {t(service.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(service.subtitleKey)}
              </p>
            </div>
            <div className="flex justify-center py-8">
              <motion.div 
                className="w-20 h-20 rounded-2xl bg-background/80 dark:bg-background/50 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <service.icon className="w-10 h-10 text-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t(service.descKey)}
            </p>
            <div className="flex items-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>{t("services.learnMore")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </AnimatedSection>
  );
};

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 border border-border/50 rounded-full opacity-50" />
      <div className="absolute bottom-20 left-0 w-48 h-48 border border-primary/20 rounded-full opacity-50" />

      <div className="container px-6 lg:px-12 relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16 -mt-[100px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t("services.subtitle")}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.href} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
