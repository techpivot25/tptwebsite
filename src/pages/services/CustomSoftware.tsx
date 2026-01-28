import { Code, Database, Cloud, Link, RefreshCw, Shield, Building, Heart, FileText, Factory } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceFAQ from "@/components/ServiceFAQ";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const services = [
  { icon: Code, title: "Custom Application Development", description: "Tailored software solutions designed to address your specific business challenges" },
  { icon: Database, title: "Database Design & Development", description: "Scalable, secure database architectures optimized for performance" },
  { icon: Cloud, title: "Cloud-Native Solutions", description: "Modern applications with microservices, containers, and serverless" },
  { icon: Link, title: "API Development & Integration", description: "RESTful and GraphQL APIs that connect your systems seamlessly" },
  { icon: RefreshCw, title: "Legacy System Modernization", description: "Transform outdated systems into modern, maintainable applications" },
  { icon: Shield, title: "Security & Compliance", description: "Enterprise-grade security with GDPR, HIPAA, SOC 2 compliance" },
];

const process = [
  { step: "01", title: "Discovery", description: "Understanding your business, challenges, and objectives" },
  { step: "02", title: "Planning", description: "Defining scope, architecture, and development roadmap" },
  { step: "03", title: "Design", description: "Creating user-centered designs and technical specifications" },
  { step: "04", title: "Development", description: "Agile development with regular demos and feedback cycles" },
  { step: "05", title: "Testing", description: "Comprehensive QA, security testing, and performance optimization" },
  { step: "06", title: "Deployment", description: "Smooth rollout with training and ongoing support" },
];

const industries = [
  { icon: Building, title: "Finance & Banking", description: "Trading platforms, risk management, and regulatory compliance" },
  { icon: Heart, title: "Healthcare", description: "EHR systems, patient portals, and HIPAA-compliant solutions" },
  { icon: FileText, title: "Insurance", description: "Claims processing, underwriting, and customer management" },
  { icon: Factory, title: "Manufacturing", description: "ERP systems, supply chain, and production optimization" },
];

const faqs = [
  {
    question: "How long does custom software development take?",
    answer: "Project timelines depend on complexity and scope. A simple MVP typically takes 8-12 weeks, while enterprise-grade applications may require 4-8 months. During discovery, we provide detailed timelines with milestones and deliverables."
  },
  {
    question: "What technologies do you use for development?",
    answer: "We select technologies based on your project requirements. Our stack includes React, Node.js, Python, .NET, Java, AWS, Azure, GCP, PostgreSQL, MongoDB, and more. We prioritize scalability, maintainability, and long-term support."
  },
  {
    question: "How do you handle project communication?",
    answer: "We maintain transparent communication through regular sprint demos, weekly status updates, and dedicated project managers. You'll have access to project management tools like Jira or Asana for real-time progress tracking."
  },
  {
    question: "What happens after the software is launched?",
    answer: "We offer comprehensive post-launch support including bug fixes, security updates, performance monitoring, and feature enhancements. Our SLA-backed maintenance packages ensure your application runs smoothly 24/7."
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Absolutely. We specialize in system integration, whether it's connecting to legacy systems, third-party APIs, or enterprise platforms like Salesforce, SAP, or Oracle. We ensure seamless data flow across your technology ecosystem."
  },
];

const CustomSoftware = () => {
  return (
    <ServicePageLayout
      title="Custom Software Development"
      subtitle="Tailored Solutions"
      description="Delivering tailored software solutions built around your unique business processes and objectives for efficiency and growth."
      icon={<Code className="w-8 h-8 text-primary" />}
    >
      {/* Services */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Custom Development Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end software development tailored to your specific needs
            </p>
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

      {/* Process */}
      <section className="py-20 lg:py-28 bg-[#f5f5f7] dark:bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Development Process
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step, index) => (
              <AnimatedSection key={step.step} animation="fadeUp" delay={index * 100}>
                <motion.div 
                  className="p-6 bg-background dark:bg-card rounded-2xl shadow-sm h-full"
                  whileHover={{ 
                    y: -6,
                    boxShadow: "0 16px 32px -12px rgba(0,0,0,0.1)"
                  }}
                >
                  <div className="text-3xl font-bold text-primary/30 mb-3">{step.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industries We Serve
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <AnimatedSection key={industry.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={industry.icon}
                  title={industry.title}
                  description={industry.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ServiceFAQ faqs={faqs} serviceName="Custom Software Development" />
    </ServicePageLayout>
  );
};

export default CustomSoftware;
