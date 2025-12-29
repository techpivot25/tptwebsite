import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const ServicePageLayout = ({
  title,
  subtitle,
  description,
  children,
  icon,
}: ServicePageLayoutProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    
    // Defer animation setup to avoid forced reflows during initial render
    const timeoutId = setTimeout(() => {
      ctx = gsap.context(() => {
        // Set initial state without triggering reflow
        gsap.set(".hero-content", { opacity: 0, y: 60 });
        
        // Animate after a frame to avoid forced reflow
        gsap.to(".hero-content", { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          delay: 0.1
        });

        const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
        if (sections.length > 0) {
          // Set initial state for sections
          gsap.set(sections, { opacity: 0, y: 50 });
          
          // Create individual ScrollTriggers with optimized settings
          sections.forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top 80%",
              onEnter: () => {
                gsap.to(section, {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power2.out",
                });
              },
              onLeaveBack: () => {
                gsap.set(section, { opacity: 0, y: 50 });
              },
            });
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{title} | TechPivot Technologies</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section - Linnify style */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-foreground overflow-hidden"
        >
          {/* Geometric decorations */}
          <div className="absolute -top-20 -right-20 w-80 h-80 border border-background/10 rounded-full" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary/40 rounded-full" />

          <div className="container px-6 lg:px-12 relative z-10">
            <div className="hero-content max-w-4xl">
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors mb-8 group text-sm uppercase tracking-wide"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl border border-background/20 bg-background/5 flex items-center justify-center">
                  {icon}
                </div>
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  {subtitle}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-6">
                {title}
              </h1>
              <p className="text-xl text-background/70 max-w-2xl">
                {description}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" asChild>
                  <Link to="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-background/30 hover:bg-background/10" style={{ color: '#1D2839' }} asChild>
                  <Link to="/technologies">
                    View Technologies
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div ref={contentRef}>{children}</div>

        <Footer />
      </div>
    </>
  );
};

export default ServicePageLayout;