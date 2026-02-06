import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Heart, Users, Clock, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg-careers.jpg";

const benefits = [
  {
    icon: TrendingUp,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement paths.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented professionals in an inclusive environment.",
  },
  {
    icon: Clock,
    title: "Flexible Work",
    description: "Remote-friendly policies and flexible schedules.",
  },
];

const openPositions = [
  {
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Remote / Chandigarh",
    type: "Full-time",
  },
  {
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote / Chandigarh",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote / Chandigarh",
    type: "Full-time",
  },
  {
    title: "Business Development Manager",
    department: "Sales",
    location: "Remote / India",
    type: "Full-time",
  },
];

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers - TechPivot | Join Our Team</title>
        <meta
          name="description"
          content="Join TechPivot and build your career with innovators shaping the future of technology. Explore open positions in engineering, AI, design, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="pt-36 pb-20 lg:pt-44 lg:pb-24 bg-foreground relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url(${heroBg})` }}
            />
            
            {/* Geometric decorations */}
            <div className="absolute -top-20 -right-20 w-80 h-80 border border-background/10 rounded-full" />
            <div className="absolute bottom-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />

            <div className="container px-6 lg:px-12 relative z-10">
              <div className="max-w-3xl">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block"
                >
                  CAREERS
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-6"
                >
                  Build Your Career With Us
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-background/70 mb-10"
                >
                  Join a team of innovators shaping the future of technology.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" asChild>
                    <a href="#positions">
                      Open Positions
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-background/30 hover:bg-background/10" style={{ color: '#1D2839' }} asChild>
                    <Link to="/technologies">
                      View Technologies
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Why Work With Us */}
          <section className="py-20 lg:py-28 bg-background">
            <div className="container px-6 lg:px-12">
              <AnimatedSection animation="fadeUp" className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Why Work With Us.
                </h2>
                <p className="text-xl text-muted-foreground mt-2">Take your pick.</p>
              </AnimatedSection>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <AnimatedSection key={benefit.title} animation="fadeUp" delay={index * 100}>
                    <AppleCardCompact
                      icon={benefit.icon}
                      title={benefit.title}
                      description={benefit.description}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section id="positions" className="py-20 lg:py-28 bg-[#f5f5f7] dark:bg-muted/30">
            <div className="container px-6 lg:px-12">
              <AnimatedSection animation="fadeUp" className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  Open Positions.
                </h2>
                <p className="text-xl text-muted-foreground mt-2">Join our team.</p>
              </AnimatedSection>

              <div className="max-w-4xl mx-auto space-y-4">
                {openPositions.map((position, index) => (
                  <AnimatedSection key={position.title} animation="fadeUp" delay={index * 100}>
                    <motion.div
                      className="bg-background border border-border/50 rounded-2xl p-6 transition-all duration-500"
                      whileHover={{ 
                        y: -4,
                        boxShadow: "0 16px 32px -12px rgba(0,0,0,0.1)"
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{position.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {position.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {position.location}
                            </span>
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                              {position.type}
                            </span>
                          </div>
                        </div>
                        <Button asChild className="group">
                          <Link to={`/contact?position=${encodeURIComponent(position.title)}`}>
                            Apply Now
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>

              {/* No matching position CTA */}
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Don't see a position that fits? We're always looking for talented individuals.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">
                    Send Us Your Resume
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
