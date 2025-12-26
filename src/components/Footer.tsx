import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/techpivot-logo.jpg";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="container px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-background/70 mb-8">
            Partner with us for your next digital transformation journey. 
            Let's build something extraordinary together.
          </p>
          <Button size="xl" variant="hero" className="bg-primary hover:bg-primary/90 group">
            Start Your Project
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-background/10">
        <div className="container px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="TechPivot Logo" className="h-10 w-auto rounded" />
                <span className="font-semibold text-lg">TechPivot</span>
              </div>
              <p className="text-sm text-background/60 leading-relaxed">
                TechPivot Technologies & Consulting – Your trusted partner for 
                cutting-edge digital solutions.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-3 text-sm text-background/60">
                <li><a href="#services" className="hover:text-background transition-colors">AI Agent Development</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">SaaS Development</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Mobile Apps</a></li>
                <li><a href="#services" className="hover:text-background transition-colors">Cloud & Security</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-background/60">
                <li><a href="#about" className="hover:text-background transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-background transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-sm text-background/60">
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href="mailto:contact@techpivot.com" className="hover:text-background transition-colors">
                    contact@techpivot.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+1 (123) 456-7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5" />
                  <span>Chandigarh, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>© 2025 TechPivot Technologies & Consulting. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
