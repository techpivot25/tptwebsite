import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVectorAnimation from "@/components/HeroVectorAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, ArrowRight, Upload, Loader2, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getCalApi } from "@calcom/embed-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    message: "",
    timeline: "",
    budget: "",
    source: ""
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Cal.com embed
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "consultation" });
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#007bff" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.trim().length > 255) {
      newErrors.email = "Email must be less than 255 characters";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = "Message must be less than 5000 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:mime;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare file data if file is uploaded
      let fileContent: string | null = null;
      let fileType: string | null = null;
      
      if (file) {
        fileContent = await fileToBase64(file);
        fileType = file.type;
      }

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
          timeline: formData.timeline,
          budget: formData.budget,
          source: formData.source,
          fileName: file?.name || null,
          fileContent: fileContent,
          fileType: fileType
        }
      });
      
      if (error) {
        console.error("Error sending contact form:", error);
        toast.error("Failed to send message. Please try again later.");
        return;
      }
      
      toast.success("Thank you! We'll get back to you soon. Check your email for confirmation.");
      setFormData({ name: "", email: "", company: "", message: "", timeline: "", budget: "", source: "" });
      setFile(null);
      setErrors({});
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@techpivot.in", href: "mailto:info@techpivot.in" },
    { icon: MapPin, label: "Offices", value: "India • USA • Canada • UAE", href: null },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | TechPivot Technologies</title>
        <meta name="description" content="Get in touch with TechPivot for your digital transformation needs." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-36 pb-20 lg:pt-44 lg:pb-24 bg-foreground relative overflow-hidden">
          {/* Animated vector background */}
          <HeroVectorAnimation />
          
          {/* Geometric decorations */}
          <div className="absolute -top-20 -right-20 w-80 h-80 border border-background/10 rounded-full" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />

          <div className="container px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                CONTACT US
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mt-4 mb-6">
                Let's Build Something Great Together
              </h1>
              <p className="text-xl text-background/70 mb-10">
                Ready to transform your business? Let's discuss your project and explore how we can help.
              </p>
              
              <div className="flex flex-wrap gap-4">
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

        {/* Contact Form Section */}
        <section className="py-20 lg:py-28">
          <div className="container px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mb-8">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Input 
                        placeholder="Your Name *" 
                        value={formData.name} 
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`h-12 border-border bg-card ${errors.name ? 'border-destructive' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Email Address *" 
                        value={formData.email} 
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`h-12 border-border bg-card ${errors.email ? 'border-destructive' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <Input 
                    placeholder="Company (Optional)" 
                    value={formData.company} 
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                    className="h-12 border-border bg-card"
                    disabled={isSubmitting}
                  />
                  
                  {/* Timeline Select */}
                  <div>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                      <SelectTrigger className="h-12 border-border bg-card">
                        <SelectValue placeholder="When do you want to launch your solution?" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="immediate">Immediately (0–1 month)</SelectItem>
                        <SelectItem value="1-3months">Within 1–3 months</SelectItem>
                        <SelectItem value="3-6months">Within 3–6 months</SelectItem>
                        <SelectItem value="6+months">Within 6+ months</SelectItem>
                        <SelectItem value="exploring">Exploring / need consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget Select */}
                  <div>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                      <SelectTrigger className="h-12 border-border bg-card">
                        <SelectValue placeholder="Project Budget Range" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="evaluating">Evaluating</SelectItem>
                        <SelectItem value="5k-25k">$5K - $25K</SelectItem>
                        <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k+">More than $100K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Source Select */}
                  <div>
                    <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                      <SelectTrigger className="h-12 border-border bg-card">
                        <SelectValue placeholder="How Did You Find Us?" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="clutch">Clutch</SelectItem>
                        <SelectItem value="google">Google Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Textarea 
                      placeholder="Tell us about your project... *" 
                      rows={6} 
                      value={formData.message} 
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`border-border bg-card resize-none ${errors.message ? 'border-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>

                  {/* File Upload */}
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
                    />
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="h-12 border border-dashed border-border rounded-md bg-card flex items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-sm">
                        {file ? file.name : "Upload Project Document (Optional)"}
                      </span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:pl-12">
                <h2 className="text-2xl font-bold text-foreground uppercase tracking-wide mb-8">
                  Get in Touch
                </h2>
                <div className="space-y-8">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex gap-4 p-4 border border-border rounded-xl hover:border-primary/50 transition-colors">
                      <div className="w-12 h-12 rounded-lg border border-border bg-muted/50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground uppercase tracking-wide text-sm">{item.label}</h3>
                        {item.href ? (
                          <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Box */}
                <div className="mt-12 p-8 bg-foreground text-background rounded-2xl">
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-4">
                    Ready to Start?
                  </h3>
                  <p className="text-background/70 mb-6">
                    Schedule a free consultation with our team to discuss your project requirements.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    data-cal-namespace="consultation"
                    data-cal-link="techpivot-technologies-spt9na"
                    data-cal-config='{"layout":"month_view"}'
                  >
                    <Calendar className="mr-2 w-4 h-4" />
                    Schedule a Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;