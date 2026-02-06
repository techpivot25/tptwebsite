import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Award, Shield } from "lucide-react";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import HeroVectorAnimation from "@/components/HeroVectorAnimation";
import { motion } from "framer-motion";

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries and exploring new technological frontiers"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with clients to understand and exceed their expectations"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Delivering the highest quality solutions with attention to detail"
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Building trust through transparent and ethical business practices"
  }
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - TechPivot Technologies</title>
        <meta name="description" content="Learn about TechPivot Technologies - programming the future with advanced technology and smart solutions in AI, Blockchain, and Metaverse development." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-foreground text-background relative overflow-hidden">
          {/* Animated vector background */}
          <HeroVectorAnimation />
          
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
                ABOUT US
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              >
                Programming the Future with Advanced Technology
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-background/70"
              >
                We specialize in cutting-edge AI, Blockchain, and Metaverse development, delivering smart solutions that transform businesses.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 lg:py-28">
          <div className="container px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Vision */}
              <AnimatedSection animation="fadeUp">
                <motion.div 
                  className="h-full p-8 bg-[#f5f5f7] dark:bg-card rounded-2xl transition-all duration-500"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
                  }}
                >
                  <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                    Our Vision
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-foreground">
                    Global Leader in Next-Generation Technology
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the global leader in next-generation technology solutions, empowering businesses to transform their operations through innovative AI, Blockchain, and Metaverse applications. We envision a future where technology seamlessly integrates with business processes to drive unprecedented growth and efficiency.
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* Mission */}
              <AnimatedSection animation="fadeUp" delay={100}>
                <motion.div 
                  className="h-full p-8 bg-[#f5f5f7] dark:bg-card rounded-2xl transition-all duration-500"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
                  }}
                >
                  <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                    Our Mission
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-foreground">
                    Solving Real-World Business Challenges
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To deliver cutting-edge technology solutions that solve real-world business challenges. We are committed to excellence, innovation, and building long-term partnerships with our clients by providing exceptional service and measurable results through advanced AI, Blockchain, and Metaverse technologies.
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 lg:py-28 bg-[#f5f5f7] dark:bg-muted/30">
          <div className="container px-6 lg:px-12">
            <AnimatedSection animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Our Core Values.
              </h2>
              <p className="text-xl text-muted-foreground mt-2">
                The principles that guide everything we do.
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <AnimatedSection key={value.title} animation="fadeUp" delay={index * 100}>
                  <AppleCardCompact
                    icon={value.icon}
                    title={value.title}
                    description={value.description}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 lg:py-28">
          <div className="container px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection animation="fadeUp">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-foreground">
                  From Vision to Reality
                </h2>
                
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Founded with a vision to revolutionize the technology landscape, TechPivot Technologies has grown into a trusted partner for businesses seeking to leverage cutting-edge innovations. Our journey began with a simple belief: that technology should empower businesses, not complicate them.
                  </p>
                  <p>
                    Today, we stand at the forefront of technological advancement, specializing in Artificial Intelligence, Blockchain solutions, and Metaverse development. Our team of expert developers, designers, and strategists work tirelessly to transform complex challenges into elegant solutions.
                  </p>
                  <p>
                    We have successfully delivered projects across various industries, helping organizations streamline operations, enhance customer experiences, and unlock new revenue streams. Our commitment to innovation and excellence has made us a preferred technology partner for businesses worldwide.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-foreground text-background">
          <div className="container px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <AnimatedSection animation="fadeUp">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Work Together?
                </h2>
                <p className="text-xl text-background/70 mb-8">
                  Let's discuss how we can help transform your business with our cutting-edge solutions.
                </p>
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-base font-semibold group"
                  asChild
                >
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default About;
