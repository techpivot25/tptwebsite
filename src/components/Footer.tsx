import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/techpivot-logo.jpg";

const Footer = () => {
  const services = [
    { label: "Generative AI", href: "/services/generative-ai" },
    { label: "Agentic AI", href: "/services/agentic-ai" },
    { label: "Custom Software", href: "/services/custom-software" },
    { label: "SaaS Platform", href: "/services/saas-platform" },
    { label: "Mobile App Development", href: "/services/mobile-app" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Cloud & Security", href: "/services/cloud-security" },
    { label: "IoT Solutions", href: "/services/iot" },
    { label: "Staff Augmentation", href: "/services/staff-augmentation" },
    { label: "Software Consultancy", href: "/services/consultancy" },
  ];

  const company = [
    { label: "About Us", href: "/#about" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: "Technologies", href: "/technologies" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ];

  const social = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="TechPivot Logo" className="h-10 w-auto rounded" />
              <span className="font-bold text-xl text-background">TechPivot</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Your trusted partner for cutting-edge AI and digital transformation solutions. Building the future, one project at a time.
            </p>
            <div className="flex gap-4">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background/10 hover:border-primary transition-colors"
                  aria-label={item.label}
                >
                  <item.icon className="w-4 h-4 text-background/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-background">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-background/60 hover:text-primary transition-colors flex items-center gap-1 group"
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
            <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-background">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
                    className="text-sm text-background/60 hover:text-primary transition-colors flex items-center gap-1 group"
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
            <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-background">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-background/60">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail size={14} className="text-primary" />
                </div>
                <a href="mailto:contact@techpivot.com" className="hover:text-primary transition-colors">
                  contact@techpivot.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone size={14} className="text-primary" />
                </div>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-primary" />
                </div>
                <span>Chandigarh, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© 2025 TechPivot Technologies & Consulting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
