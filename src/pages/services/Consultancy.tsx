import { Lightbulb, Target, TrendingUp, Users, FileText, Zap, CheckCircle, ArrowRight } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const services = [
  { icon: Target, title: "Technology Strategy", description: "Align your technology investments with business objectives" },
  { icon: TrendingUp, title: "Digital Transformation", description: "Guide your organization through digital evolution" },
  { icon: Users, title: "Team Building", description: "Build and scale high-performing engineering teams" },
  { icon: FileText, title: "Architecture Review", description: "Evaluate and optimize your technical architecture" },
  { icon: Zap, title: "Process Optimization", description: "Streamline development workflows and practices" },
  { icon: CheckCircle, title: "Quality Assurance", description: "Implement robust testing and quality frameworks" },
];

const approach = [
  { step: "01", title: "Assessment", description: "Comprehensive evaluation of your current state" },
  { step: "02", title: "Strategy", description: "Develop tailored roadmap and recommendations" },
  { step: "03", title: "Implementation", description: "Execute with hands-on guidance and support" },
  { step: "04", title: "Optimization", description: "Continuous improvement and knowledge transfer" },
];

const Consultancy = () => {
  return (
    <ServicePageLayout
      title="Software Consultancy"
      subtitle="Strategic Guidance"
      description="Strategic technology consulting to guide your digital transformation journey and maximize your technology investments."
      icon={<Lightbulb className="w-8 h-8 text-primary" />}
    >
      {/* Services */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Consulting Services
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 lg:py-28 bg-[#f5f5f7] dark:bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
          </AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {approach.map((step, index) => (
                <AnimatedSection key={step.step} animation="fadeUp" delay={index * 100}>
                  <div className="relative h-full">
                    <motion.div 
                      className="p-6 bg-background dark:bg-card rounded-2xl shadow-sm text-center h-full"
                      whileHover={{ 
                        y: -6,
                        boxShadow: "0 16px 32px -12px rgba(0,0,0,0.1)"
                      }}
                    >
                      <div className="text-3xl font-bold text-primary/30 mb-3">{step.step}</div>
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </motion.div>
                    {index < approach.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground/30 -translate-y-1/2 z-10" />
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default Consultancy;
