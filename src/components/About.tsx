import { CheckCircle2, MapPin } from "lucide-react";

const About = () => {
  const highlights = [
    "Preferred technology partner for enterprises across North and South America",
    "98% client satisfaction rate with measurable results",
    "Round-the-clock support ensuring your projects never sleep",
    "Deep cultural understanding and optimal time zone coverage",
  ];

  const locations = [
    { name: "Chandigarh, India", type: "Development Hub" },
    { name: "Toronto, Canada", type: "North America HQ" },
    { name: "New York, USA", type: "Enterprise Solutions" },
    { name: "Dubai, UAE", type: "Middle East Operations" },
  ];

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              About TechPivot
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              Technology Partner for{" "}
              <span className="text-gradient">Digital Transformation</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              TechPivot stands at the forefront of software and mobile app development. 
              With proven expertise in digital transformation, we've successfully delivered 
              projects that have revolutionized how businesses operate, compete, and grow 
              in today's digital economy.
            </p>
            <p className="text-muted-foreground mb-8">
              We don't just build technology; we craft solutions that transform businesses 
              and create lasting competitive advantages.
            </p>

            {/* Highlights */}
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Locations */}
          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Global Presence
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {locations.map((location) => (
                <div
                  key={location.name}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">{location.name}</div>
                    <div className="text-sm text-muted-foreground">{location.type}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-border/50 grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Delivered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
