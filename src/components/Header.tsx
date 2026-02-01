import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight, Bot, Sparkles, Cloud, Globe, Smartphone, Shield, Code, Users, Cpu, Lightbulb } from "lucide-react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

const services = [
  { label: "Agentic AI", href: "/services/agentic-ai", icon: Bot },
  { label: "Generative AI", href: "/services/generative-ai", icon: Sparkles },
  { label: "SaaS Platform", href: "/services/saas-platform", icon: Cloud },
  { label: "Web Development", href: "/services/web-development", icon: Globe },
  { label: "Mobile App", href: "/services/mobile-app", icon: Smartphone },
  { label: "Cloud & Security", href: "/services/cloud-security", icon: Shield },
  { label: "Custom Software", href: "/services/custom-software", icon: Code },
  { label: "Staff Augmentation", href: "/services/staff-augmentation", icon: Users },
  { label: "IoT Solutions", href: "/services/iot", icon: Cpu },
  { label: "Consultancy", href: "/services/consultancy", icon: Lightbulb },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const rafRef = useRef<number | null>(null);
  
  const isHomePage = location.pathname === "/";
  // Check if current page has a dark hero background that needs white text
  // Currently all pages use light gradient backgrounds, so we use dark text everywhere
  const isServicePage = location.pathname.startsWith("/services/");
  const useWhiteText = isServicePage && !isScrolled;

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 20);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={useWhiteText ? logoLight : logoDark} 
              alt="TechPivot Logo" 
              className="w-[200px] h-[70px]" 
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors uppercase tracking-wide ${useWhiteText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
              Home
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)} 
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-medium transition-colors uppercase tracking-wide py-2 ${useWhiteText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {/* Invisible bridge to prevent gap */}
              {isServicesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[200px] h-6" />
              )}
              {isServicesOpen && (
                <div className="fixed left-0 right-0 top-20 z-[100] animate-fade-in">
                  <div className="bg-background border-b border-border shadow-xl">
                    <div className="container mx-auto px-6 lg:px-12 py-8">
                      <div className="flex items-center justify-center gap-4 lg:gap-8 flex-wrap">
                        {services.map((s) => {
                          const IconComponent = s.icon;
                          return (
                            <Link 
                              key={s.href} 
                              to={s.href} 
                              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted transition-all duration-200 group min-w-[90px] cursor-pointer"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                                <IconComponent className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors" />
                              </div>
                              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center whitespace-nowrap">
                                {s.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/technologies" className={`text-sm font-medium transition-colors uppercase tracking-wide ${useWhiteText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
              Technologies
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors uppercase tracking-wide ${useWhiteText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
              About
            </Link>
            <Link to="/careers" className={`text-sm font-medium transition-colors uppercase tracking-wide ${useWhiteText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
              Careers
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors uppercase tracking-wide ${useWhiteText ? "text-background/70 hover:text-background" : "text-muted-foreground hover:text-foreground"}`}>
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="lg" className="group" asChild>
              <Link to="/contact">
                Talk To Expert
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden p-2 ${useWhiteText ? "text-background" : "text-foreground"}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link to="/" className="py-3 text-base font-medium text-foreground uppercase tracking-wide">Home</Link>
              <div className="py-2">
                <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex items-center justify-between w-full text-base font-medium text-foreground uppercase tracking-wide">
                  Services <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {isServicesOpen && (
                  <div className="mt-2 pl-4 space-y-2 border-l border-border">
                    {services.map((s) => (
                      <Link key={s.href} to={s.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground">{s.label}</Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/technologies" className="py-3 text-base font-medium text-foreground uppercase tracking-wide">Technologies</Link>
              <Link to="/about" className="py-3 text-base font-medium text-foreground uppercase tracking-wide">About</Link>
              <Link to="/careers" className="py-3 text-base font-medium text-foreground uppercase tracking-wide">Careers</Link>
              <Link to="/contact" className="py-3 text-base font-medium text-foreground uppercase tracking-wide">Contact</Link>
              <Button className="mt-4 w-full" size="lg" asChild>
                <Link to="/contact">Talk To Expert</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;