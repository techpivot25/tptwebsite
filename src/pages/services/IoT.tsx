import { Cpu, Wifi, Database, BarChart, Shield, Zap, Factory, Home, Heart, Truck } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const capabilities = [
  { icon: Wifi, title: "Enterprise Device Connectivity", description: "Seamlessly connect, manage, and monitor thousands to millions of IoT devices using protocols like MQTT, CoAP, LoRaWAN, NB-IoT, and cellular. Support for WiFi, Bluetooth, Zigbee, Z-Wave, and proprietary protocols" },
  { icon: Database, title: "Real-Time Data Ingestion", description: "High-throughput data collection from sensors with time-series databases (InfluxDB, TimescaleDB), streaming pipelines (Kafka, Kinesis), edge preprocessing, and data validation for reliable insights at scale" },
  { icon: BarChart, title: "Advanced Analytics & Visualization", description: "Real-time dashboards with customizable KPIs, predictive analytics with machine learning, anomaly detection, historical trend analysis, and interactive data exploration with drill-down capabilities" },
  { icon: Shield, title: "Military-Grade Security", description: "X.509 certificate-based device authentication, AES-256 encryption for data in transit and at rest, secure boot, hardware security modules (HSM), OTA firmware updates with rollback, and penetration testing" },
  { icon: Zap, title: "Edge Computing & AI", description: "Process data locally on edge devices for sub-100ms response times, run AI models at the edge (TensorFlow Lite, ONNX), reduce bandwidth costs, and maintain functionality during network outages" },
  { icon: Cpu, title: "Intelligent Automation", description: "Rule-based and AI-driven automation triggered by sensor data, threshold alerts, predictive maintenance schedules, automated workflows, integration with business systems, and custom logic execution" },
];

const solutions = [
  { icon: Factory, title: "Industrial IoT (IIoT) & Industry 4.0", description: "Smart manufacturing with predictive maintenance using vibration sensors and ML, equipment monitoring with OEE tracking, process optimization with real-time quality control, digital twin simulations, and automated production scheduling" },
  { icon: Home, title: "Smart Buildings & Facilities", description: "Intelligent HVAC with occupancy-based climate control, energy management with demand response, smart lighting with daylight harvesting, access control with facial recognition, leak detection, and air quality monitoring for healthier environments" },
  { icon: Heart, title: "Healthcare & Medical IoT", description: "Remote patient monitoring with wearables, vital signs tracking (heart rate, blood pressure, glucose), medication adherence monitoring, fall detection for elderly care, hospital asset tracking, and HIPAA-compliant data management" },
  { icon: Truck, title: "Fleet & Logistics Management", description: "Real-time GPS vehicle tracking, driver behavior monitoring (harsh braking, speeding), fuel consumption optimization, predictive maintenance for vehicles, route optimization with traffic integration, cold chain monitoring for perishables, and geofencing alerts" },
];

const IoT = () => {
  return (
    <ServicePageLayout
      title="IoT Solutions"
      subtitle="Connected Devices"
      description="Connected device ecosystems with real-time data processing and intelligent automation for smarter operations. Our IoT platform expertise includes device management, edge computing, telemetry systems, predictive maintenance, cloud integration, and applications across manufacturing, agriculture, healthcare, smart cities, and industrial automation."
      icon={<Cpu className="w-8 h-8 text-primary" />}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
