import { Cloud, Layers, Key, Users, Zap, Shield, Database, Globe, CreditCard, BarChart } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const features = [
  { icon: Layers, title: "Multi-Tenancy Architecture", description: "Isolated data and customizable experiences for each customer" },
  { icon: Key, title: "Authentication & SSO", description: "Secure login with OAuth, SAML, and enterprise SSO integration" },
  { icon: Users, title: "User Management", description: "Roles, permissions, and team collaboration features" },
  { icon: Zap, title: "API-First Design", description: "RESTful and GraphQL APIs for seamless integrations" },
  { icon: Shield, title: "Security & Compliance", description: "SOC 2, GDPR, and industry-specific compliance" },
  { icon: Database, title: "Scalable Infrastructure", description: "Auto-scaling cloud architecture for any load" },
];

const solutions = [
  {
    icon: Globe,
    title: "MVP Development",
    description: "Launch your SaaS product quickly with a fully functional MVP that validates your idea and attracts early adopters.",
  },
  {
    icon: CreditCard,
    title: "Subscription Management",
    description: "Complete billing integration with Stripe, usage-based pricing, and subscription lifecycle management.",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    description: "Real-time analytics, usage metrics, and customer insights to drive data-informed decisions.",
  },
];

const SaaSPlatform = () => {
  return (
    <ServicePageLayout
      title="SaaS Platform Development"
      subtitle="Cloud-Native Solutions"
      description="Build secure, scalable cloud-native applications with APIs, microservices, multi-tenancy, and AI integration for rapid MVPs and subscription businesses."
      icon={<Cloud className="w-8 h-8 text-primary" />}
    >
      {/* Features */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Features
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Solutions */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              SaaS Solutions We Deliver
            </h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <AnimatedSection key={solution.title} animation="fadeUp" delay={index * 100}>
                <div className="group h-full">
                  <motion.div
                    className="relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-8 overflow-hidden transition-all duration-500"
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <motion.div
                        className="w-14 h-14 rounded-xl bg-background/80 dark:bg-background/50 flex items-center justify-center mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <solution.icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{solution.title}</h3>
                      <p className="text-muted-foreground">{solution.description}</p>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default SaaSPlatform;
