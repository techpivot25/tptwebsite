import { CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/AnimatedCounter";

const About = () => {
  const highlights = [
    "Fast execution with agile development practices",
    "Strategic growth partnership for scaling businesses",
    "Agentic AI expertise for intelligent automation",
    "Reliable scaling with enterprise-grade infrastructure",
  ];

  const locations = [
    { name: "Chandigarh, India", type: "Development Hub" },
    { name: "Toronto, Canada", type: "North America HQ" },
    { name: "New York, USA", type: "Enterprise Solutions" },
    { name: "Dubai, UAE", type: "Middle East Operations" },
  ];

  const stats = [
    { end: 500, suffix: "+", label: "Projects Delivered" },
    { end: 98, suffix: "%", label: "Client Satisfaction" },
    { end: 50, suffix: "+", label: "Expert Engineers" },
    { end: 24, suffix: "/7", label: "Global Support" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-background/20 to-transparent" />
      <div className="absolute -top-32 -right-32 w-64 h-64 border border-background/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-primary/30 rounded-full" />

      <div className="container px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 -mt-[50px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-6">
            Your Trusted Partner in Delivering Ambitious AI Initiatives
          </h2>
          <p className="text-lg text-background/70">
            TechPivot stands at the forefront of software and AI development, helping leading brands accelerate their digital initiatives.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 border border-background/10 rounded-xl hover:border-primary/50 transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2.4} className="text-4xl md:text-5xl font-bold text-primary mb-2" />
              <div className="text-sm text-background/60 uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Key Benefits */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold uppercase tracking-wide mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 p-4 border border-background/10 rounded-xl hover:border-primary/30 transition-colors animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-background/90">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="mt-6 bg-primary hover:bg-primary/90 text-foreground group"
              asChild
            >
              <Link to="/contact">
                Work With Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Right - Global Presence */}
          <div className="bg-background/5 border border-background/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold uppercase tracking-wide mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Global Presence
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {locations.map((location, index) => (
                <div
                  key={location.name}
                  className="p-4 bg-background/5 border border-background/10 rounded-xl hover:border-primary/30 transition-colors animate-fade-up"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="font-medium text-background">{location.name}</div>
                  <div className="text-sm text-background/60">{location.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;