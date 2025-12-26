import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl shadow-soft border-b border-border/50" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="TechPivot Logo" className="h-10 w-auto" />
            <span className="font-semibold text-lg text-foreground">TechPivot</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in">
                  <div className="bg-card border border-border rounded-xl shadow-elevated p-2">
                    {services.map((s) => (
                      <Link key={s.href} to={s.href} className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link to="/technologies" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Technologies</Link>
            <Link to="/#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Button size="lg" asChild><Link to="/contact">Get Started</Link></Button>
          </div>

          <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <div className="py-2">
                <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex items-center justify-between w-full text-base font-medium text-muted-foreground">
                  Services <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                </button>
                {isServicesOpen && (
                  <div className="mt-2 pl-4 space-y-2">
                    {services.map((s) => (
                      <Link key={s.href} to={s.href} className="block py-1 text-sm text-muted-foreground hover:text-foreground">{s.label}</Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/technologies" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground">Technologies</Link>
              <Link to="/#about" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground">About</Link>
              <Link to="/contact" className="py-2 text-base font-medium text-muted-foreground hover:text-foreground">Contact</Link>
              <Button className="mt-4 w-full" size="lg" asChild><Link to="/contact">Get Started</Link></Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
