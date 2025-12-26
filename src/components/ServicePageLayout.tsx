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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.utils.toArray(".animate-section").forEach((section: any) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>{title} | TechPivot Technologies</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-foreground to-foreground/90 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="container px-6 lg:px-12 relative z-10">
            <div className="hero-content max-w-4xl">
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  {icon}
                </div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {subtitle}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                {title}
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl">
                {description}
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Start Your Project</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/technologies">
                    View Technologies <ArrowRight className="ml-2 w-4 h-4" />
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
