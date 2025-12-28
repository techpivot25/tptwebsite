import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Heart, Users, Clock, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GLOBAL_AREA_SERVED, HREFLANG_ENTRIES, OG_LOCALE_ALTERNATES } from "@/lib/seo";

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
  const canonical = "https://techpivot.in/careers";
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@graph": openPositions.map((role) => ({
      "@type": "JobPosting",
      "title": role.title,
      "description": `${role.title} role in ${role.department} offering ${role.type} engagement.`,
      "employmentType": role.type,
      "hiringOrganization": {
        "@type": "Organization",
        "@id": "https://techpivot.in/#organization",
        "name": "TechPivot Technologies & Consulting",
        "sameAs": "https://techpivot.in/"
      },
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Worldwide"
      },
      "jobLocationType": "TELECOMMUTE",
      "directApply": true,
      "identifier": {
        "@type": "PropertyValue",
        "name": "TechPivot",
        "value": role.title
      },
      "datePosted": new Date().toISOString().split("T")[0],
      "validThrough": "2026-12-31",
      "industry": role.department,
      "url": `${canonical}?position=${encodeURIComponent(role.title)}`
    }))
  };

  return (
    <>
      <Helmet>
        <title>Careers - TechPivot | Join Our Team</title>
        <meta
          name="description"
          content="Join TechPivot and build your career with innovators shaping the future of technology. Explore open positions in engineering, AI, design, and more."
        />
        <link rel="canonical" href={canonical} />
        {HREFLANG_ENTRIES.map(link => {
          const normalized = link.href.endsWith("/") ? link.href.slice(0, -1) : link.href;
          return (
            <link
              key={`href-${link.hrefLang}`}
              rel="alternate"
              hrefLang={link.hrefLang}
              href={`${normalized}/careers`}
            />
          );
        })}
        <meta property="og:title" content="Careers at TechPivot" />
        <meta property="og:description" content="Explore open positions and join our team of innovators." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/careers" />
        <meta property="og:image" content="https://techpivot.in/og/careers.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at TechPivot" />
        <meta name="twitter:description" content="Explore open positions and join our team of innovators." />
        <meta name="twitter:image" content="https://techpivot.in/og/careers.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://techpivot.in/careers#webpage",
              "url": "https://techpivot.in/careers",
              "name": "Careers at TechPivot",
              "isPartOf": {
                "@type": "WebSite",
                "@id": "https://techpivot.in/#website"
              },
              "about": ["Engineering", "AI/ML", "Design", "DevOps", "Sales"],
              "publisher": {
                "@type": "Organization",
                "@id": "https://techpivot.in/#organization",
                "name": "TechPivot Technologies & Consulting",
                "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)}
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jobPostingSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-secondary/10 to-background relative overflow-hidden">
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="container px-6 lg:px-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
                  CAREERS
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-tight mb-6">
                  Build Your Career <span className="text-primary">With Us</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join a team of innovators shaping the future of technology.
                </p>
                <Button size="lg" className="group" asChild>
                  <a href="#positions">
                    Open Positions
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Why Work With Us */}
          <section className="py-20 lg:py-28">
            <div className="container px-6 lg:px-12">
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  BENEFITS
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight mt-4">
                  Why Work With Us
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section id="positions" className="py-20 lg:py-28 bg-muted/30">
            <div className="container px-6 lg:px-12">
              <div className="text-center mb-12">
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  JOIN US
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight mt-4">
                  Open Positions
                </h2>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {openPositions.map((position, index) => (
                  <div
                    key={position.title}
                    className="bg-background border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{position.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
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
                  </div>
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
