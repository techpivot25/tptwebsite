import { Code, Database, Cloud, Link, RefreshCw, Shield, Building, Heart, FileText, Factory } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceFAQ from "@/components/ServiceFAQ";

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
            Our Custom Development Services
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            End-to-end software development tailored to your specific needs
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Our Development Process
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((step) => (
              <div key={step.step} className="p-6 bg-card rounded-xl border border-border/50">
                <div className="text-3xl font-bold text-primary/30 mb-3">{step.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Industries We Serve
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry) => (
              <div key={industry.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <industry.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{industry.title}</h3>
                <p className="text-sm text-muted-foreground">{industry.description}</p>
              </div>
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
