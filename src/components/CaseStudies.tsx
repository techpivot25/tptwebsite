import { ArrowUpRight, Monitor, Smartphone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    id: 1,
    title: "BuzzPay",
    category: "FinTech",
    description: "A comprehensive financial management platform enabling seamless transactions and real-time analytics for enterprise clients.",
    platforms: ["desktop", "mobile"],
    tags: ["React", "Node.js", "AWS"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Rahbar Assistant",
    category: "EdTech",
    description: "AI-powered reading assistant that helps students improve comprehension and reading speed through personalized exercises.",
    platforms: ["mobile", "web"],
    tags: ["Flutter", "Python", "OpenAI"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "MaxiLife HealthSync",
    category: "Healthcare",
    description: "Integrated healthcare platform connecting patients with providers, featuring telehealth and appointment management.",
    platforms: ["desktop", "mobile", "web"],
    tags: ["React Native", "Django", "GCP"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "MES Logistics",
    category: "Logistics",
    description: "End-to-end supply chain management system with real-time tracking, inventory optimization, and predictive analytics.",
    platforms: ["desktop", "web"],
    tags: ["Vue.js", "Go", "Azure"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=400&fit=crop",
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 -mt-[75px]">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-foreground">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {caseStudies.map((study, index) => (
            <div 
              key={study.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-32 lg:h-40 overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Platform icons */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1">
                  {study.platforms.map((platform) => (
                    <div 
                      key={platform}
                      className="w-6 h-6 rounded-md bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground"
                    >
                      <PlatformIcon platform={platform} />
                    </div>
                  ))}
                </div>

                {/* Category badge */}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium uppercase tracking-wide">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide group-hover:text-primary transition-colors line-clamp-1">
                    {study.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                </div>
                
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {study.tags.slice(0, 2).map((tag) => (
                    <span 
                      key={tag}
                      className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-medium"
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