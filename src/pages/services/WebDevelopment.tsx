import { Globe, Monitor, Smartphone, Search, Zap, FileText, ShoppingCart, Building, Layout, BookOpen, Target, ClipboardList, Palette, Code2, TestTube, Rocket } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const features = [
  { icon: Monitor, title: "Responsive Design", description: "Pixel-perfect experiences across all devices and screen sizes with mobile-first approach, progressive enhancement, and adaptive layouts that ensure optimal usability" },
  { icon: FileText, title: "CMS Integration", description: "Flexible content management with WordPress, Contentful, Strapi, Sanity, or custom headless CMS solutions with intuitive editing interfaces and workflow automation" },
  { icon: Search, title: "SEO Optimisation", description: "Built-in SEO best practices including semantic HTML, structured data, XML sitemaps, meta optimization, Core Web Vitals optimization, and technical audits for maximum search visibility" },
  { icon: Zap, title: "Performance Tuning", description: "Lightning-fast load times with code splitting, lazy loading, image optimization, CDN integration, server-side rendering, and 90+ Google PageSpeed scores" },
];

const process = [
  { step: 1, icon: Target, title: "Strategy", description: "Define strategic goals for evolving your idea into a successful website" },
  { step: 2, icon: ClipboardList, title: "Analysis & Planning", description: "Identify requirements, define team structure, and prepare product roadmap" },
  { step: 3, icon: Palette, title: "UI/UX Design", description: "Create seamless and effortless user experiences with polished design" },
  { step: 4, icon: Code2, title: "Development", description: "Build robust frontend and backend following agile development process" },
  { step: 5, icon: TestTube, title: "Testing", description: "Validate quality thoroughly with comprehensive testing across all devices" },
  { step: 6, icon: Rocket, title: "Deployment & Support", description: "Launch your website with ongoing support and future enhancements" },
];

const solutions = [
  { icon: ShoppingCart, title: "E-Commerce Solutions", description: "Full-featured online stores with Shopify, WooCommerce, or custom platforms. Includes product catalogs, shopping carts, secure payments (Stripe, PayPal), inventory management, and customer accounts" },
  { icon: Building, title: "Corporate Websites", description: "Professional enterprise websites that represent your brand with compelling design, clear messaging, lead generation, contact forms, blog integration, and multilingual support" },
  { icon: Layout, title: "Complex Web Applications", description: "Feature-rich single-page applications (SPA) and progressive web apps (PWA) with real-time updates, interactive dashboards, user authentication, and third-party integrations" },
  { icon: BookOpen, title: "Content & Media Platforms", description: "Scalable blogs, news portals, magazines, and media sites with advanced content management, user comments, social sharing, newsletters, and advertising integration" },
];

const WebDevelopment = () => {
  return (
    <ServicePageLayout
      title="Web Development Services"
      subtitle="Digital Presence"
      description="Creating powerful, responsive websites that drive business growth and engage users with modern frameworks and best practices. Our web development expertise includes React, Vue, and Next.js for frontend excellence, Node.js and Python for robust backends, and full-stack solutions with SEO optimization and accessibility compliance."
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
