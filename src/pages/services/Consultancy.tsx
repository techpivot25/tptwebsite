import { Lightbulb, Target, TrendingUp, Users, FileText, Zap, CheckCircle, ArrowRight, Settings } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

const services = [
  { icon: Target, title: "Technology Strategy & Roadmap", description: "Align technology investments with business goals through comprehensive IT strategy development, technology stack evaluation, build vs buy analysis, vendor selection, digital maturity assessment, and multi-year transformation roadmaps with clear milestones and ROI projections" },
  { icon: TrendingUp, title: "Digital Transformation Consulting", description: "Guide enterprise-wide digital evolution with change management, process reengineering, legacy system modernization, cloud migration strategy, data-driven decision-making frameworks, agile transformation, and organizational capability building" },
  { icon: Users, title: "Engineering Team Building & Scaling", description: "Build high-performing teams through talent strategy, hiring process optimization, team structure design, engineering culture development, retention strategies, career frameworks, performance management, and leadership coaching" },
  { icon: FileText, title: "Architecture Assessment & Design", description: "Evaluate system architecture for scalability, security, and maintainability. Includes architecture audits, microservices migration, API strategy, database optimization, cloud architecture design, disaster recovery planning, and technical debt reduction roadmaps" },
  { icon: Settings, title: "DevOps & Process Optimization", description: "Streamline development workflows with CI/CD pipeline implementation, infrastructure as code, automated testing strategies, deployment automation, incident management, SRE practices, monitoring/observability, and post-mortem processes" },
  { icon: CheckCircle, title: "Quality Assurance & Testing Strategy", description: "Implement comprehensive QA frameworks including test automation architecture, performance testing, security testing (OWASP), accessibility testing, test data management, QA metrics and reporting, and shift-left testing practices" },
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
      description="Strategic technology consulting to guide your digital transformation journey and maximize your technology investments. Our consultants provide technology strategy, architecture design, agile coaching, team mentoring, process optimization, vendor evaluation, and implementation support across AI, cloud, web, mobile, and enterprise platforms."
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
