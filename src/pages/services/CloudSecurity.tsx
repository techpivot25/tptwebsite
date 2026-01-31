import { Shield, Cloud, Server, Lock, Eye, AlertTriangle, Database, FileCheck, RefreshCw } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const cloudServices = [
  { icon: Cloud, title: "Cloud Migration", description: "Seamless transition to AWS, Azure, or Google Cloud with minimal disruption" },
  { icon: Server, title: "Infrastructure Setup", description: "Scalable, reliable cloud infrastructure optimized for performance and cost" },
  { icon: Database, title: "Cloud-Native Apps", description: "Build applications designed for cloud with microservices and containers" },
];

const securityFeatures = [
  { icon: Lock, title: "Data Encryption", description: "End-to-end encryption for data at rest and in transit" },
  { icon: FileCheck, title: "Compliance Management", description: "GDPR, HIPAA, SOC 2, and regulatory compliance frameworks" },
  { icon: RefreshCw, title: "Disaster Recovery", description: "Automated backups and business continuity planning" },
];

const additionalServices = [
  { icon: Eye, title: "24/7 Monitoring", description: "Real-time monitoring and alerting for all cloud resources" },
  { icon: AlertTriangle, title: "Security Audits", description: "Regular security assessments and penetration testing" },
  { icon: Shield, title: "Incident Response", description: "Rapid response team for security incidents and breaches" },
];

const CloudSecurity = () => {
  return (
    <ServicePageLayout
      title="Cloud & Security Services"
      subtitle="Enterprise Protection"
      description="Secure, scalable cloud infrastructure and enterprise-grade security solutions to protect your data and ensure compliance."
      icon={<Shield className="w-8 h-8 text-primary" />}
      showGeometricBlocks={true}
    >
      {/* Cloud Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cloud Solutions
            </h2>
            <p className="text-lg text-muted-foreground">
              Leverage the power of cloud computing with scalable infrastructure, seamless migration, 
              and cloud-native development expertise.
            </p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {cloudServices.map((service, index) => (
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

      {/* Security Features */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Security Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Enterprise-grade security solutions to protect your data and ensure compliance.
            </p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
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

      {/* Additional Services */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
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
    </ServicePageLayout>
  );
};

export default CloudSecurity;
