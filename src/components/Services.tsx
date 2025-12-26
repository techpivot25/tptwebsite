import { 
  Bot, 
  Sparkles, 
  Cloud, 
  Globe, 
  Smartphone, 
  Shield, 
  Users, 
  Boxes, 
  Cpu, 
  Code, 
  Lightbulb 
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Agent Development",
    description: "Autonomous systems that perceive, reason, plan, and execute—automating customer support, IT operations, and procurement.",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    description: "Advanced tools for content generation, design automation, and synthetic data to boost creativity and efficiency.",
  },
  {
    icon: Cloud,
    title: "SaaS Platform Development",
    description: "Secure, cloud-native apps with APIs, microservices, multi-tenancy, and AI integration for rapid MVPs.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "High-performing, SEO-optimized sites with intuitive UX using modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform iOS/Android apps with robust backends and real-time features.",
  },
  {
    icon: Shield,
    title: "Cloud & Security",
    description: "Scalable AWS/Azure architectures with cybersecurity, compliance, and secure pipelines.",
  },
  {
    icon: Users,
    title: "IT Staff Augmentation",
    description: "On-demand expert teams of developers, PMs, and AI specialists to scale your projects.",
  },
  {
    icon: Boxes,
    title: "End-to-End Delivery",
    description: "GCC-enabled resource planning from our India-Canada bases for cost optimization and global scalability.",
  },
  {
    icon: Cpu,
    title: "IoT Solutions",
    description: "Connected device ecosystems with real-time data processing and intelligent automation.",
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Tailored software solutions designed to meet your unique business requirements and workflows.",
  },
  {
    icon: Lightbulb,
    title: "Software Consultancy",
    description: "Strategic technology consulting to guide your digital transformation journey.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Comprehensive Technology Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From AI-powered automation to enterprise-grade cloud solutions, we deliver 
            end-to-end services that drive digital transformation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 bg-card rounded-xl border border-border/50 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
