import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/techpivot-logo.jpg";

const Footer = () => {
  const services = [
    { label: "AI Agent Development", href: "/services/agentic-ai" },
    { label: "SaaS Development", href: "/services/saas-platform" },
    { label: "Mobile Apps", href: "/services/mobile-app" },
    { label: "Cloud & Security", href: "/services/cloud-security" },
  ];

  const company = [
    { label: "About Us", href: "/#about" },
    { label: "Technologies", href: "/technologies" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="TechPivot Logo" className="h-10 w-auto rounded" />
              <span className="font-semibold text-lg text-foreground">TechPivot</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for cutting-edge AI and digital transformation solutions.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold uppercase tracking-wide text-sm mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold uppercase tracking-wide text-sm mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold uppercase tracking-wide text-sm mb-4 text-foreground">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:contact@techpivot.com" className="hover:text-foreground transition-colors">
                  contact@techpivot.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-primary" />
                <span>Chandigarh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 TechPivot Technologies & Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;