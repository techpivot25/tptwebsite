import { ArrowUpRight, Monitor, Smartphone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    id: 1,
    title: "Kober",
    category: "FinTech",
    description: "A comprehensive financial management platform enabling seamless transactions and real-time analytics for enterprise clients.",
    platforms: ["desktop", "mobile"],
    tags: ["React", "Node.js", "AWS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Readability",
    category: "EdTech",
    description: "AI-powered reading assistant that helps students improve comprehension and reading speed through personalized exercises.",
    platforms: ["mobile", "web"],
    tags: ["Flutter", "Python", "OpenAI"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "HealthSync",
    category: "Healthcare",
    description: "Integrated healthcare platform connecting patients with providers, featuring telehealth and appointment management.",
    platforms: ["desktop", "mobile", "web"],
    tags: ["React Native", "Django", "GCP"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "LogiFlow",
    category: "Logistics",
    description: "End-to-end supply chain management system with real-time tracking, inventory optimization, and predictive analytics.",
    platforms: ["desktop", "web"],
    tags: ["Vue.js", "Go", "Azure"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  const icons = {
    desktop: Monitor,
    mobile: Smartphone,
    web: Globe,
  };
  const Icon = icons[platform as keyof typeof icons] || Globe;
  return <Icon className="w-4 h-4" strokeWidth={1.5} />;
};

const CaseStudies = () => {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Geometric decoration */}
      <div className="absolute top-20 left-0 w-48 h-48 border border-border rounded-full opacity-30" />
      <div className="absolute bottom-20 right-0 w-64 h-64 border border-primary/20 rounded-full opacity-30" />

      <div className="container px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              CASE STUDIES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mt-4 text-foreground">
              Featured Work
            </h2>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <div 
              key={study.id}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Platform icons */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  {study.platforms.map((platform) => (
                    <div 
                      key={platform}
                      className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground"
                    >
                      <PlatformIcon platform={platform} />
                    </div>
                  ))}
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wide">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0" />
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;