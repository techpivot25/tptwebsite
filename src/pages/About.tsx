import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, Users, Award, Shield } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import Parallax from "@/components/Parallax";
import { OG_LOCALE_ALTERNATES } from "@/lib/seo";

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
        <meta property="og:title" content="About TechPivot Technologies" />
        <meta property="og:description" content="Programming the future with AI, Blockchain, and Metaverse solutions." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://techpivot.in/about" />
        <meta property="og:image" content="https://techpivot.in/og/about.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta property="og:image:alt" content="About TechPivot preview" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About TechPivot Technologies" />
        <meta name="twitter:description" content="Programming the future with AI, Blockchain, and Metaverse solutions." />
        <meta name="twitter:image" content="https://techpivot.in/og/about.jpg" />
        <meta name="twitter:image:alt" content="About TechPivot preview" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://techpivot.in/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://techpivot.in/about"
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <Header />

      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 w-64 h-64 border border-background/10 rounded-full" />
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-primary/30 rounded-full" />

          <div className="container px-6 lg:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                About TechPivot Technologies
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6 text-foreground">
                Programming the Future with Advanced Technology
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We specialize in cutting-edge AI, Blockchain, and Metaverse development, delivering smart solutions that transform businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 lg:py-28">
          <div className="container px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="p-8 border border-border rounded-2xl hover:border-primary/50 transition-colors">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                  Our Vision
                </span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-foreground">
                  Global Leader in Next-Generation Technology
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in next-generation technology solutions, empowering businesses to transform their operations through innovative AI, Blockchain, and Metaverse applications. We envision a future where technology seamlessly integrates with business processes to drive unprecedented growth and efficiency.
                </p>
              </div>

              {/* Mission */}
              <div className="p-8 border border-border rounded-2xl hover:border-primary/50 transition-colors">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                  Our Mission
                </span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-foreground">
                  Solving Real-World Business Challenges
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver cutting-edge technology solutions that solve real-world business challenges. We are committed to excellence, innovation, and building long-term partnerships with our clients by providing exceptional service and measurable results through advanced AI, Blockchain, and Metaverse technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 lg:py-28 relative overflow-hidden">
          <Parallax speed={0.3}>
            <div className="container px-6 lg:px-12">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <AnimatedCounter
                    end={500}
                    duration={2.5}
                    suffix="+"
                    className="text-5xl md:text-6xl font-bold text-primary mb-4"
                  />
                  <p className="text-muted-foreground uppercase tracking-wide text-sm">Projects Delivered</p>
                </div>
                <div className="text-center p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <AnimatedCounter
                    end={98}
                    duration={2.5}
                    suffix="%"
                    className="text-5xl md:text-6xl font-bold text-primary mb-4"
                  />
                  <p className="text-muted-foreground uppercase tracking-wide text-sm">Client Satisfaction</p>
                </div>
                <div className="text-center p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <AnimatedCounter
                    end={50}
                    duration={2.5}
                    suffix="+"
                    className="text-5xl md:text-6xl font-bold text-primary mb-4"
                  />
                  <p className="text-muted-foreground uppercase tracking-wide text-sm">Expert Engineers</p>
                </div>
                <div className="text-center p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <AnimatedCounter
                    end={24}
                    duration={2.5}
                    suffix="/7"
                    className="text-5xl md:text-6xl font-bold text-primary mb-4"
                  />
                  <p className="text-muted-foreground uppercase tracking-wide text-sm">Global Support</p>
                </div>
              </div>
            </div>
          </Parallax>
        </section>

        {/* Core Values */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: '#EAEAEA' }}>
          <div className="container px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                Our Core Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
                The Principles That Guide Everything We Do
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  className="p-6 bg-background border border-border rounded-2xl hover:border-primary/50 transition-colors text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 lg:py-28">
          <div className="container px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-8 text-foreground">
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
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-6 text-foreground">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
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
