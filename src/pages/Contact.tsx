import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, ArrowRight, Upload } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { GLOBAL_AREA_SERVED, OG_LOCALE_ALTERNATES } from "@/lib/seo";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", company: "", message: "", timeline: "", budget: "", source: "" });
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@techpivot.in", href: "mailto:info@techpivot.in" },
    { icon: Phone, label: "Phone", value: "+91 7838379095", href: "tel:+917838379095" },
    { icon: MapPin, label: "Offices", value: "India • USA • Canada • UAE", href: null },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | TechPivot Technologies</title>
        <meta name="description" content="Get in touch with TechPivot for your digital transformation needs." />
        <link rel="canonical" href="https://techpivot.in/contact" />
        <meta property="og:title" content="Contact TechPivot" />
        <meta property="og:description" content="Discuss your project and consult with our team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/contact" />
        <meta property="og:image" content="https://techpivot.in/og/contact.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact TechPivot" />
        <meta name="twitter:description" content="Discuss your project and consult with our team." />
        <meta name="twitter:image" content="https://techpivot.in/og/contact.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "mainEntity": {
                "@type": "Organization",
                "@id": "https://techpivot.in/#organization",
                "name": "TechPivot Technologies & Consulting",
                "url": "https://techpivot.in/",
                "logo": "https://techpivot.in/logo.png",
                "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)},
                "contactPoint": [{
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "email": "info@techpivot.in",
                  "telephone": "+91-7838379095",
                  "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)}
                }]
              }
            }
          `}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
          {/* Geometric decorations */}
          <div className="absolute -top-20 -right-20 w-80 h-80 border border-background/10 rounded-full" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />

          <div className="container px-6 lg:px-12 relative z-10">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                CONTACT US
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-tight mt-4 mb-6">
                Let's Build Something Great Together
              </h1>
              <p className="text-xl text-muted-foreground">
                Ready to transform your business? Let's discuss your project and explore how we can help.
              </p>
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
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 border-border bg-card"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 border-border bg-card"
                    />
                  </div>
                  <Input
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="h-12 border-border bg-card"
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

                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="border-border bg-card resize-none"
                  />

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

                  <Button type="submit" size="lg" className="w-full group">
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
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