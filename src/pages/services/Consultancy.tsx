import { Helmet } from "react-helmet-async";
import { Lightbulb, Target, TrendingUp, Users, FileText, Zap, CheckCircle, ArrowRight } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { GLOBAL_AREA_SERVED, OG_LOCALE_ALTERNATES } from "@/lib/seo";

const services = [
  { icon: Target, title: "Technology Strategy", description: "Align your technology investments with business objectives" },
  { icon: TrendingUp, title: "Digital Transformation", description: "Guide your organization through digital evolution" },
  { icon: Users, title: "Team Building", description: "Build and scale high-performing engineering teams" },
  { icon: FileText, title: "Architecture Review", description: "Evaluate and optimize your technical architecture" },
  { icon: Zap, title: "Process Optimization", description: "Streamline development workflows and practices" },
  { icon: CheckCircle, title: "Quality Assurance", description: "Implement robust testing and quality frameworks" },
];

const approach = [
  { step: "01", title: "Assessment", description: "Comprehensive evaluation of your current state" },
  { step: "02", title: "Strategy", description: "Develop tailored roadmap and recommendations" },
  { step: "03", title: "Implementation", description: "Execute with hands-on guidance and support" },
  { step: "04", title: "Optimization", description: "Continuous improvement and knowledge transfer" },
];

const Consultancy = () => {
  return (
    <>
      <Helmet>
        <title>Software Consultancy | TechPivot</title>
        <meta name="description" content="Strategic technology consulting to guide your digital transformation and maximize ROI." />
        <link rel="canonical" href="https://techpivot.in/services/consultancy" />
        <meta property="og:title" content="Software Consultancy | TechPivot" />
        <meta property="og:description" content="Strategic technology consulting to guide your digital transformation and maximize ROI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/services/consultancy" />
        <meta property="og:image" content="https://techpivot.in/og/services/consultancy.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Software Consultancy | TechPivot" />
        <meta name="twitter:description" content="Strategic technology consulting to guide your digital transformation and maximize ROI." />
        <meta name="twitter:image" content="https://techpivot.in/og/services/consultancy.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://techpivot.in/services/consultancy#service",
              "name": "Software Consultancy",
              "serviceType": "Consulting",
              "description": "Strategic technology consulting for digital transformation.",
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
                "serviceUrl": "https://techpivot.in/services/consultancy"
              }
            }
          `}
        </script>
      </Helmet>
      <ServicePageLayout
        title="Software Consultancy"
        subtitle="Strategic Guidance"
        description="Strategic technology consulting to guide your digital transformation journey and maximize your technology investments."
        icon={<Lightbulb className="w-8 h-8 text-primary" />}
      >
        {/* Services */}
        <section className="py-20 lg:py-28 animate-section">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Our Consulting Services
            </h2>
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

        {/* Our Approach */}
        <section className="py-20 lg:py-28 animate-section relative">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Our Approach
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {approach.map((step, index) => (
                  <div key={step.step} className="relative">
                    <div className="p-6 bg-card rounded-xl border border-border/50 text-center h-full">
                      <div className="text-3xl font-bold text-primary/30 mb-3">{step.step}</div>
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                    {index < approach.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-muted-foreground/30 -translate-y-1/2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
};

export default Consultancy;
