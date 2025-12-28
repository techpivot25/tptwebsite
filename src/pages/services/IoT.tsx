import { Helmet } from "react-helmet-async";
import { Cpu, Wifi, Database, BarChart, Shield, Zap, Factory, Home, Heart, Truck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { GLOBAL_AREA_SERVED, OG_LOCALE_ALTERNATES } from "@/lib/seo";

const capabilities = [
  { icon: Wifi, title: "Device Connectivity", description: "Connect and manage thousands of IoT devices seamlessly" },
  { icon: Database, title: "Data Collection", description: "Real-time data ingestion from sensors and devices" },
  { icon: BarChart, title: "Analytics Dashboard", description: "Visualize and analyze IoT data in real-time" },
  { icon: Shield, title: "Security", description: "End-to-end encryption and secure device authentication" },
  { icon: Zap, title: "Edge Computing", description: "Process data at the edge for faster response times" },
  { icon: Cpu, title: "Automation", description: "Intelligent automation based on sensor data and triggers" },
];

const solutions = [
  { icon: Factory, title: "Industrial IoT", description: "Smart manufacturing, predictive maintenance, and process optimization" },
  { icon: Home, title: "Smart Buildings", description: "Energy management, access control, and occupancy monitoring" },
  { icon: Heart, title: "Healthcare IoT", description: "Remote patient monitoring, medical device connectivity" },
  { icon: Truck, title: "Fleet Management", description: "Vehicle tracking, driver behavior, and route optimization" },
];

const IoT = () => {
  return (
    <>
      <Helmet>
        <title>IoT Solutions | TechPivot</title>
        <meta name="description" content="Connected device ecosystems with real-time data and intelligent automation." />
        <link rel="canonical" href="https://techpivot.in/services/iot" />
        <meta property="og:title" content="IoT Solutions | TechPivot" />
        <meta property="og:description" content="Connected device ecosystems with real-time data and intelligent automation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/services/iot" />
        <meta property="og:image" content="https://techpivot.in/og/services/iot.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="IoT Solutions | TechPivot" />
        <meta name="twitter:description" content="Connected device ecosystems with real-time data and intelligent automation." />
        <meta name="twitter:image" content="https://techpivot.in/og/services/iot.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://techpivot.in/services/iot#service",
              "name": "IoT Solutions",
              "serviceType": "Internet of Things",
              "description": "Connected device ecosystems with real-time data processing and automation.",
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
                "serviceUrl": "https://techpivot.in/services/iot"
              }
            }
          `}
        </script>
      </Helmet>
      <ServicePageLayout
        title="IoT Solutions"
        subtitle="Connected Devices"
        description="Connected device ecosystems with real-time data processing and intelligent automation for smarter operations."
        icon={<Cpu className="w-8 h-8 text-primary" />}
      >
        {/* Capabilities */}
        <section className="py-20 lg:py-28 animate-section">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              IoT Capabilities
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap) => (
                <div key={cap.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <cap.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-20 lg:py-28 animate-section relative">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Industry Solutions
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
    </>
  );
};

export default IoT;
