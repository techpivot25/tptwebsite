import { Users, Code, Brain, Briefcase, Clock, Shield, Target, Zap, Globe, Award, Palette } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const expertise = [
  { icon: Code, title: "Software Developers", description: "Full-stack engineers (React, Node.js, Python), frontend specialists (React, Vue, Angular), backend developers (Java, .NET, Go), mobile developers (iOS, Android, React Native, Flutter), and embedded systems engineers" },
  { icon: Brain, title: "AI/ML Specialists", description: "Machine learning engineers, data scientists with Python/R, deep learning experts (TensorFlow, PyTorch), NLP specialists, computer vision engineers, MLOps practitioners, and AI solutions architects" },
  { icon: Briefcase, title: "Project & Product Managers", description: "Certified scrum masters (CSM), agile coaches, technical program managers, product owners, delivery managers, and PMI-certified project managers with domain expertise" },
  { icon: Shield, title: "DevOps & Cloud Engineers", description: "AWS/Azure/GCP architects, Kubernetes administrators, CI/CD specialists, site reliability engineers (SRE), infrastructure as code (Terraform, CloudFormation), and automation experts" },
  { icon: Target, title: "QA & Test Engineers", description: "Test automation engineers (Selenium, Cypress), performance testing specialists (JMeter, LoadRunner), security testing (OWASP), mobile app testing, and QA team leads" },
  { icon: Palette, title: "UI/UX Designers", description: "Product designers, UX researchers with user testing expertise, visual designers (Figma, Sketch), interaction designers, information architects, and design system specialists" },
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
      description="On-demand expert teams of developers, PMs, and AI specialists to scale your projects quickly and efficiently. We provide full-stack developers, AI/ML engineers, DevOps specialists, quality assurance professionals, and solution architects who integrate seamlessly with your teams and deliver immediate business value."
      icon={<Users className="w-8 h-8 text-primary" />}
    >
      {/* Expertise */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Expertise
            </h2>
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
