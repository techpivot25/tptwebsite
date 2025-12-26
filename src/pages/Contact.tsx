import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | TechPivot Technologies</title>
        <meta name="description" content="Get in touch with TechPivot for your digital transformation needs." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get In Touch</h1>
              <p className="text-lg text-muted-foreground">Ready to transform your business? Let's discuss your project.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <Input placeholder="Company (Optional)" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                <Textarea placeholder="Your Message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
              <div className="space-y-8">
                <div className="flex gap-4"><Mail className="w-6 h-6 text-primary" /><div><h3 className="font-semibold text-foreground">Email</h3><p className="text-muted-foreground">hello@techpivot.com</p></div></div>
                <div className="flex gap-4"><Phone className="w-6 h-6 text-primary" /><div><h3 className="font-semibold text-foreground">Phone</h3><p className="text-muted-foreground">+1 (555) 123-4567</p></div></div>
                <div className="flex gap-4"><MapPin className="w-6 h-6 text-primary" /><div><h3 className="font-semibold text-foreground">Offices</h3><p className="text-muted-foreground">India • USA • Canada • UAE</p></div></div>
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
