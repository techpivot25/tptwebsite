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
      <section className="py-20 lg:py-28 bg-foreground animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-background">
              Our Approach
            </h2>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto mt-12">
            {/* Cards Row */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {approach.map((step, index) => (
                <AnimatedSection key={step.step} animation="fadeUp" delay={index * 100}>
                  <motion.div 
                    className="p-6 bg-secondary/80 dark:bg-card/50 rounded-2xl h-full border border-muted/20"
                    whileHover={{ 
                      y: -6,
                      boxShadow: "0 16px 32px -12px rgba(0,0,0,0.3)"
                    }}
                  >
                    <div className="text-4xl font-bold text-background/90 mb-3">{step.step}</div>
                    <h3 className="font-bold text-background uppercase tracking-wide mb-3">{step.title}</h3>
                    <p className="text-sm text-background/60 leading-relaxed">{step.description}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
            
            {/* Timeline */}
            <div className="relative hidden lg:block">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/50 -translate-y-1/2" />
              
              {/* Timeline Circles */}
              <div className="flex justify-around relative z-10">
                {approach.map((step, index) => (
                  <AnimatedSection key={`circle-${step.step}`} animation="scaleIn" delay={index * 150 + 400}>
                    <div className="flex flex-col items-center">
                      {/* Vertical connector line */}
                      <div className="w-0.5 h-8 bg-primary/50 -mt-8 mb-0" />
                      {/* Circle */}
                      <motion.div 
                        className="w-12 h-12 rounded-full border-2 border-primary bg-foreground flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-primary font-semibold">{index + 1}</span>
                      </motion.div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default Consultancy;
