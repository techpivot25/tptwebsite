import { Globe, Monitor, Smartphone, Search, Zap, FileText, ShoppingCart, Building, Layout, BookOpen } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const features = [
  { icon: Monitor, title: "Responsive Design", description: "Seamless experiences across all devices with mobile-first approach" },
  { icon: FileText, title: "CMS Integration", description: "Easy content management with WordPress, Strapi, or custom CMS" },
  { icon: Search, title: "SEO Optimization", description: "Built-in SEO best practices for maximum visibility" },
  { icon: Zap, title: "Performance Tuning", description: "Lightning-fast load times and optimal performance" },
];

const process = [
  { step: "01", title: "Discovery & Planning", description: "Understanding your goals and target audience" },
  { step: "02", title: "Design & Prototyping", description: "Creating wireframes and visual designs" },
  { step: "03", title: "Development", description: "Agile development with regular demos and feedback" },
  { step: "04", title: "Testing & QA", description: "Ensuring quality across all devices and browsers" },
  { step: "05", title: "Launch & Support", description: "Deployment and ongoing maintenance" },
];

const solutions = [
  { icon: ShoppingCart, title: "E-Commerce", description: "Full-featured online stores with secure payments" },
  { icon: Building, title: "Corporate Websites", description: "Professional sites that represent your brand" },
  { icon: Layout, title: "Web Applications", description: "Complex apps with rich functionality" },
  { icon: BookOpen, title: "Content Platforms", description: "Blogs, portals, and media sites" },
];

const WebDevelopment = () => {
  return (
    <ServicePageLayout
      title="Web Development Services"
      subtitle="Digital Presence"
      description="Creating powerful, responsive websites that drive business growth and engage users with modern frameworks and best practices."
      icon={<Globe className="w-8 h-8 text-primary" />}
    >
      {/* Features */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We Deliver
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

      {/* Process */}
      <section className="py-20 lg:py-28 bg-[#f5f5f7] dark:bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Development Process
            </h2>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeUp" delay={index * 100}>
                <motion.div 
                  className="flex gap-6 mb-6 last:mb-0 p-4 rounded-2xl transition-all duration-300"
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(0,0,0,0.02)"
                  }}
                >
                  <motion.div 
                    className="flex-shrink-0 w-16 h-16 rounded-2xl bg-background dark:bg-card flex items-center justify-center shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg font-bold text-primary">{step.step}</span>
                  </motion.div>
                  <div className="pt-3">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Website Solutions
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

export default WebDevelopment;
