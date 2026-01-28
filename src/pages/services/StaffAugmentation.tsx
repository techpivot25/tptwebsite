import { Users, Code, Brain, Briefcase, Clock, Shield, Target, Zap, Globe, Award } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const expertise = [
  { icon: Code, title: "Developers", description: "Full-stack, frontend, backend, and mobile developers" },
  { icon: Brain, title: "AI/ML Specialists", description: "Data scientists, ML engineers, and AI architects" },
  { icon: Briefcase, title: "Project Managers", description: "Agile coaches, scrum masters, and technical PMs" },
  { icon: Shield, title: "DevOps Engineers", description: "Cloud architects, SREs, and automation specialists" },
  { icon: Target, title: "QA Engineers", description: "Test automation, performance testing, and security testing" },
  { icon: Globe, title: "UI/UX Designers", description: "Product designers, UX researchers, and visual designers" },
];

const benefits = [
  { icon: Zap, title: "Quick Onboarding", description: "Get skilled resources within days, not months" },
  { icon: Clock, title: "Flexible Engagement", description: "Scale up or down based on project needs" },
  { icon: Award, title: "Vetted Talent", description: "Pre-screened professionals with proven track records" },
  { icon: Shield, title: "Reduced Risk", description: "No long-term commitments or overhead costs" },
];

const StaffAugmentation = () => {
  return (
    <ServicePageLayout
      title="IT Staff Augmentation"
      subtitle="On-Demand Talent"
      description="On-demand expert teams of developers, PMs, and AI specialists to scale your projects quickly and efficiently."
      icon={<Users className="w-8 h-8 text-primary" />}
    >
      {/* Expertise */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access top-tier talent across all technology domains
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, index) => (
              <AnimatedSection key={item.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Staff Augmentation
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default StaffAugmentation;
