import { Helmet } from "react-helmet-async";
import { Shield, Cloud, Server, Lock, Eye, AlertTriangle, Database, FileCheck, RefreshCw } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { GLOBAL_AREA_SERVED, OG_LOCALE_ALTERNATES } from "@/lib/seo";

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
    <>
      <Helmet>
        <title>Cloud & Security Services | TechPivot</title>
        <meta name="description" content="Secure, scalable cloud infrastructure with compliance and 24/7 monitoring." />
        <link rel="canonical" href="https://techpivot.in/services/cloud-security" />
        <meta property="og:title" content="Cloud & Security Services | TechPivot" />
        <meta property="og:description" content="Secure, scalable cloud infrastructure with compliance and 24/7 monitoring." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/services/cloud-security" />
        <meta property="og:image" content="https://techpivot.in/og/services/cloud-security.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cloud & Security Services | TechPivot" />
        <meta name="twitter:description" content="Secure, scalable cloud infrastructure with compliance and 24/7 monitoring." />
        <meta name="twitter:image" content="https://techpivot.in/og/services/cloud-security.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://techpivot.in/services/cloud-security#service",
              "name": "Cloud & Security Services",
              "serviceType": "Cloud Infrastructure & Security",
              "description": "Secure, scalable cloud infrastructure and enterprise-grade security solutions.",
              "provider": {
                "@type": "Organization",
                "@id": "https://techpivot.in/#organization",
                "name": "TechPivot Technologies & Consulting",
                "url": "https://techpivot.in/",
                "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)}
              },
              "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)},
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://techpivot.in/services/cloud-security"
              }
            }
          `}
        </script>
      </Helmet>
      <ServicePageLayout
        title="Cloud & Security Services"
        subtitle="Enterprise Protection"
        description="Secure, scalable cloud infrastructure and enterprise-grade security solutions to protect your data and ensure compliance."
        icon={<Shield className="w-8 h-8 text-primary" />}
      >
        {/* Cloud Solutions */}
        <section className="py-20 lg:py-28 animate-section">
          <div className="container px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Cloud Solutions
              </h2>
              <p className="text-lg text-muted-foreground">
                Leverage the power of cloud computing with scalable infrastructure, seamless migration,
                and cloud-native development expertise.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {cloudServices.map((service) => (
                <div key={service.title} className="p-8 bg-card rounded-2xl border border-border/50 hover-lift">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20 lg:py-28 animate-section relative">
          <div className="container px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Security Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Enterprise-grade security solutions to protect your data and ensure compliance.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature) => (
                <div key={feature.title} className="p-8 bg-card rounded-2xl border border-border/50 hover-lift">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 lg:py-28 animate-section">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Additional Services
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {additionalServices.map((service) => (
                <div key={service.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
};

export default CloudSecurity;
