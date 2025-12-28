import { Helmet } from "react-helmet-async";
import { Users, Code, Brain, Briefcase, Clock, Shield, Target, Zap, Globe, Award } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { GLOBAL_AREA_SERVED, OG_LOCALE_ALTERNATES } from "@/lib/seo";

const expertise = [
  { icon: Code, title: "Developers", description: "Full-stack, frontend, backend, and mobile developers" },
  { icon: Brain, title: "AI/ML Specialists", description: "Data scientists, ML engineers, and AI architects" },
  { icon: Briefcase, title: "Project Managers", description: "Agile coaches, scrum masters, and technical PMs" },
  { icon: Shield, title: "DevOps Engineers", description: "Cloud architects, SREs, and automation specialists" },
  { icon: Target, title: "QA Engineers", description: "Test automation, performance testing, and security testing" },
  { icon: Globe, title: "UI/UX Designers", description: "Product designers, UX researchers, and visual designers" },
];

const benefits = [
  { icon: Zap, title: "Quick Onboarding", description: "Get skilled resources within days, not months" },
  { icon: Clock, title: "Flexible Engagement", description: "Scale up or down based on project needs" },
  { icon: Award, title: "Vetted Talent", description: "Pre-screened professionals with proven track records" },
  { icon: Shield, title: "Reduced Risk", description: "No long-term commitments or overhead costs" },
];

const StaffAugmentation = () => {
  return (
    <>
      <Helmet>
        <title>IT Staff Augmentation | TechPivot</title>
        <meta name="description" content="On-demand expert teams to scale your projects quickly and efficiently." />
        <link rel="canonical" href="https://techpivot.in/services/staff-augmentation" />
        <meta property="og:title" content="IT Staff Augmentation | TechPivot" />
        <meta property="og:description" content="On-demand expert teams to scale your projects quickly and efficiently." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/services/staff-augmentation" />
        <meta property="og:image" content="https://techpivot.in/og/services/staff-augmentation.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IT Staff Augmentation | TechPivot" />
        <meta name="twitter:description" content="On-demand expert teams to scale your projects quickly and efficiently." />
        <meta name="twitter:image" content="https://techpivot.in/og/services/staff-augmentation.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://techpivot.in/services/staff-augmentation#service",
              "name": "IT Staff Augmentation",
              "serviceType": "Staffing",
              "description": "On-demand expert teams to scale projects quickly and efficiently.",
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
                "serviceUrl": "https://techpivot.in/services/staff-augmentation"
              }
            }
          `}
        </script>
      </Helmet>
      <ServicePageLayout
        title="IT Staff Augmentation"
        subtitle="On-Demand Talent"
        description="On-demand expert teams of developers, PMs, and AI specialists to scale your projects quickly and efficiently."
        icon={<Users className="w-8 h-8 text-primary" />}
      >
        {/* Expertise */}
        <section className="py-20 lg:py-28 animate-section">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
              Our Expertise
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Access top-tier talent across all technology domains
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertise.map((item) => (
                <div key={item.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 lg:py-28 animate-section relative">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Why Choose Staff Augmentation
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 bg-card rounded-xl border border-border/50 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
};

export default StaffAugmentation;
