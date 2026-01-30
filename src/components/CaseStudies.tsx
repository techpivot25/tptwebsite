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
            View All Projects
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
                className="group relative bg-[#f5f5f7] dark:bg-card rounded-2xl overflow-hidden h-full"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Title at top - Apple style */}
                <div className="p-4 pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{study.category}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-36 lg:h-44 overflow-hidden mx-4 my-4 rounded-xl">
                  <LazyImage 
                    src={study.image} 
                    alt={study.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    wrapperClassName="w-full h-full"
                    placeholderClassName="rounded-xl"
                  />
                </div>

                {/* Content at bottom */}
                <div className="p-4 pt-0">
                  {/* Platform icons */}
                  <div className="flex items-center gap-2 mb-3">
                    {study.platforms.map((platform) => (
                      <div 
                        key={platform}
                        className="w-7 h-7 rounded-lg bg-background/80 dark:bg-background/50 flex items-center justify-center text-foreground"
                      >
                        <PlatformIcon platform={platform} />
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 rounded-lg bg-background/80 dark:bg-background/50 text-muted-foreground text-xs font-medium"
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
