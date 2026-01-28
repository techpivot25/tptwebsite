import { Code, Database, Cloud, Link, RefreshCw, Shield, Building, Heart, FileText, Factory, Target, ClipboardList, Palette, Code2, TestTube, Rocket } from "lucide-react";
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
  { step: 1, icon: Target, title: "Discovery", description: "Understanding your business, challenges, and objectives" },
  { step: 2, icon: ClipboardList, title: "Planning", description: "Defining scope, architecture, and development roadmap" },
  { step: 3, icon: Palette, title: "Design", description: "Creating user-centered designs and technical specifications" },
  { step: 4, icon: Code2, title: "Development", description: "Agile development with regular demos and feedback cycles" },
  { step: 5, icon: TestTube, title: "Testing", description: "Comprehensive QA, security testing, and performance optimization" },
  { step: 6, icon: Rocket, title: "Deployment", description: "Smooth rollout with training and ongoing support" },
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

      {/* Process Timeline */}
      <section className="py-20 lg:py-28 bg-foreground text-background animate-section overflow-hidden">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Development Process
            </h2>
            <p className="text-background/70 max-w-2xl mx-auto">
              A proven methodology that ensures quality delivery at every stage
            </p>
          </AnimatedSection>
          
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative max-w-6xl mx-auto pt-48 pb-48">
            {/* Horizontal Line - centered in the timeline area */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary -translate-y-1/2 z-0" />
            
            {/* Process Steps */}
            <div className="relative flex justify-between items-center">
              {process.map((step, index) => {
                const Icon = step.icon;
                const isTop = index % 2 === 0;
                
                return (
                  <motion.div
                    key={step.step}
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Card - Top or Bottom */}
                    <div className={`absolute ${isTop ? 'bottom-20' : 'top-20'} w-44`}>
                      <motion.div
                        className="bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-4 transition-all duration-300 hover:bg-background/15 hover:border-primary/50 hover:-translate-y-1 group cursor-default"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                          <h3 className="font-semibold text-sm text-background">{step.title}</h3>
                        </div>
                        <p className="text-xs text-background/60 leading-relaxed">{step.description}</p>
                      </motion.div>
                      {/* Connector Line */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-px h-12 bg-primary ${isTop ? 'top-full' : 'bottom-full'}`} />
                    </div>
                    
                    {/* Number Circle */}
                    <motion.div
                      className="relative z-10 w-12 h-12 rounded-full bg-foreground border-2 border-primary flex items-center justify-center transition-all duration-300 hover:bg-primary group cursor-default"
                      whileHover={{ scale: 1.15 }}
                    >
                      <span className="text-sm font-bold text-primary group-hover:text-foreground transition-colors">{step.step}</span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Timeline */}
          <div className="lg:hidden relative max-w-md mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-primary" />
            
            <div className="space-y-8">
              {process.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    className="relative flex gap-6 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Number Circle */}
                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-foreground border-2 border-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{step.step}</span>
                    </div>
                    
                    {/* Card */}
                    <div className="flex-1 bg-background/10 backdrop-blur-sm border border-background/20 rounded-xl p-4 transition-all duration-300 hover:bg-background/15 hover:border-primary/50 group">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-background">{step.title}</h3>
                      </div>
                      <p className="text-sm text-background/60">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
