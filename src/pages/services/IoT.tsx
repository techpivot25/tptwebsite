import { Cpu, Wifi, Database, BarChart, Shield, Zap, Factory, Home, Heart, Truck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-bg-iot.jpg";

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
    <ServicePageLayout
      title="IoT Solutions"
      subtitle="Connected Devices"
      description="Connected device ecosystems with real-time data processing and intelligent automation for smarter operations."
      icon={<Cpu className="w-8 h-8 text-primary" />}
      backgroundImage={heroBg}
    >
      {/* Capabilities */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              IoT Capabilities
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <AnimatedSection key={cap.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={cap.icon}
                  title={cap.title}
                  description={cap.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry Solutions
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

export default IoT;
