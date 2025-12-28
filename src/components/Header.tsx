import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import logo from "@/assets/techpivot-logo.jpg";

const services = [
  { label: "Agentic AI", href: "/services/agentic-ai" },
  { label: "Generative AI", href: "/services/generative-ai" },
  { label: "SaaS Platform", href: "/services/saas-platform" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile App", href: "/services/mobile-app" },
  { label: "Cloud & Security", href: "/services/cloud-security" },
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Staff Augmentation", href: "/services/staff-augmentation" },
  { label: "IoT Solutions", href: "/services/iot" },
  { label: "Consultancy", href: "/services/consultancy" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const rafRef = useRef<number | null>(null);

  // Determine if white text should be used (only on Technologies and Contact pages)
  const isWhiteTextPage = location.pathname === '/technologies'
    || location.pathname === '/contact' ||
    location.pathname === '/services/agentic-ai' || location.pathname === '/services/generative-ai'
    || location.pathname === '/services/saas-platform' || location.pathname === '/services/web-development'
    || location.pathname === '/services/mobile-app' || location.pathname === '/services/cloud-security'
    || location.pathname === '/services/custom-software' || location.pathname === '/services/staff-augmentation'
    || location.pathname === '/services/iot' || location.pathname === '/services/consultancy'
    ;
  const textColor =  'text-muted-foreground';
  const textHoverColor = 'hover:text-foreground';


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
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="TechPivot Logo" width={40} height={40} className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="font-extrabold text-lg text-foreground tracking-wide uppercase">TechPivot</div>
              <div className="text-[11px] md:text-xs text-muted-foreground tracking-[0.16em] uppercase ml-1">Technologies & Consulting</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium ${textColor} ${textHoverColor} transition-colors uppercase tracking-wide`}>
              Home
            </Link>
            <div className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className={`flex items-center gap-1 text-sm font-medium ${textColor} ${textHoverColor} transition-colors uppercase tracking-wide`}>
                Services <ChevronDown className="w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in">
                  <div className="bg-card border border-border rounded-xl shadow-lg p-2">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        to={s.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/10 rounded-lg transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/technologies" className={`text-sm font-medium ${textColor} ${textHoverColor} transition-colors uppercase tracking-wide`}>
              Technologies
            </Link>
            <Link to="/about" className={`text-sm font-medium ${textColor} ${textHoverColor} transition-colors uppercase tracking-wide`}>
              About
            </Link>
            <Link to="/careers" className={`text-sm font-medium ${textColor} ${textHoverColor} transition-colors uppercase tracking-wide`}>
              Careers
            </Link>
            <Link to="/contact" className={`text-sm font-medium ${textColor} ${textHoverColor} transition-colors uppercase tracking-wide`}>
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
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in bg-background/60 backdrop-blur-sm">
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