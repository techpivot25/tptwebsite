import { Cloud, Layers, Key, Users, Zap, Shield, Database, Globe, CreditCard, BarChart } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Enterprise-Grade Features
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            SaaS Solutions We Deliver
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div key={solution.title} className="p-8 bg-card rounded-2xl border border-border/50 hover-lift">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default SaaSPlatform;
