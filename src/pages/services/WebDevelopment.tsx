import { Globe, Monitor, Smartphone, Search, Zap, FileText, ShoppingCart, Building, Layout, BookOpen } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            What We Deliver
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
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
          <div className="max-w-4xl mx-auto">
            {process.map((step, index) => (
              <div key={step.step} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{step.step}</span>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Website Solutions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution) => (
              <div key={solution.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default WebDevelopment;
