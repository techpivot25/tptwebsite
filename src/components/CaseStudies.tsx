import { ArrowUpRight, Monitor, Smartphone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { LazyImage } from "./ui/lazy-image";
import { motion } from "framer-motion";

const caseStudies = [
  {
    id: 1,
    title: "KryptWallet Pro",
    category: "FinTech",
    description: "A comprehensive financial management platform enabling seamless transactions and real-time analytics for enterprise clients.",
    platforms: ["desktop", "mobile"],
    tags: ["React", "Node.js", "AWS"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "ReadMate AI",
    category: "EdTech",
    description: "AI-powered reading assistant that helps students improve comprehension and reading speed through personalized exercises.",
    platforms: ["mobile", "web"],
    tags: ["Flutter", "Python", "OpenAI"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Hugo Health Connect",
    category: "Healthcare",
    description: "Integrated healthcare platform connecting patients with providers, featuring telehealth and appointment management.",
    platforms: ["desktop", "mobile", "web"],
    tags: ["React Native", "Django", "GCP"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "SupplyChain360 Go",
    category: "Logistics",
    description: "End-to-end supply chain management with real-time tracking, inventory optimization, and predictive analytics.",
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
        <AnimatedSection animation="fadeUp" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 -mt-[75px]">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Featured Work.
            </h2>
            <p className="text-xl text-muted-foreground mt-2">Take a closer look.</p>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group link-underline"
          >
            Talk To Expert
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

        {/* Case Studies Grid - Apple style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {caseStudies.map((study, index) => (
            <AnimatedSection
              key={study.id}
              animation="fadeUp"
              delay={index * 100}
            >
              <motion.div 
                className="group relative bg-[#f5f5f7] dark:bg-card rounded-2xl overflow-hidden h-full flex flex-col"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Image with category badge and platform icons */}
                <div className="relative h-44 lg:h-52 overflow-hidden">
                  <LazyImage 
                    src={study.image} 
                    alt={study.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    wrapperClassName="w-full h-full"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide">
                      {study.category}
                    </span>
                  </div>
                  {/* Platform icons overlay */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {study.platforms.map((platform) => (
                      <div 
                        key={platform}
                        className="w-8 h-8 rounded-lg bg-background/90 backdrop-blur-sm flex items-center justify-center text-foreground"
                      >
                        <PlatformIcon platform={platform} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground tracking-tight uppercase mb-2 group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {study.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {study.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-background text-muted-foreground text-xs font-medium border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
