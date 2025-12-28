import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
// import Testimonials from "@/components/Testimonials"; // Hidden for now
import Partners from "@/components/Partners";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollAnimate from "@/components/ScrollAnimate";
import { GLOBAL_AREA_SERVED, HREFLANG_ENTRIES, OG_LOCALE_ALTERNATES } from "@/lib/seo";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TechPivot Technologies & Consulting | Digital Transformation Partner</title>
        <meta
          name="description"
          content="TechPivot delivers cutting-edge AI, SaaS, mobile app development and cloud solutions. 98% client satisfaction with global offices in India, USA, Canada, and UAE."
        />
        <meta property="og:title" content="TechPivot Technologies & Consulting" />
        <meta property="og:description" content="Digital transformation partner for AI, SaaS, mobile apps, and cloud." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/" />
        <meta property="og:image" content="https://techpivot.in/og/home.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta property="og:image:alt" content="TechPivot home preview" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TechPivot Technologies & Consulting" />
        <meta name="twitter:description" content="Digital transformation partner for AI, SaaS, mobile apps, and cloud." />
        <meta name="twitter:image" content="https://techpivot.in/og/home.jpg" />
        <meta name="twitter:image:alt" content="TechPivot home preview" />
        <meta name="keywords" content="AI development, SaaS development, mobile apps, cloud solutions, digital transformation, software consulting" />
        <link rel="canonical" href="https://techpivot.in" />
        {HREFLANG_ENTRIES.map(link => (
          <link key={`href-${link.hrefLang}`} rel="alternate" hrefLang={link.hrefLang} href={link.href} />
        ))}

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TechPivot Technologies & Consulting",
              "@id": "https://techpivot.in/#organization",
              "url": "https://techpivot.in/",
              "logo": "https://techpivot.in/logo.png",
              "alternateName": [
                "TechPivot",
                "TechPivot Technologies",
                "TechPivot Technologies & Consulting"
              ],
              "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)},
              "sameAs": [
                "https://www.linkedin.com/in/techpivot-technologies/",
                "https://x.com/Techpivot.Technologies/",
                "https://www.instagram.com/Techpivot.Technologies/",
                "https://www.facebook.com/techpivot.technologies/"
              ],
              "contactPoint": [{
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "info@techpivot.in",
                "telephone": "+91-7838379095",
                "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)}
              }]
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://techpivot.in/#website",
              "url": "https://techpivot.in/",
              "name": "TechPivot Technologies & Consulting",
              "inLanguage": ["en"],
              "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)},
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://techpivot.in/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does TechPivot offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer custom software development, AI and machine learning solutions, mobile app development, cloud infrastructure, SaaS platforms, and IT staff augmentation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does a typical project take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Timelines vary by scope: an MVP is typically 4-8 weeks, and enterprise solutions range 3-6 months with milestones defined during discovery."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is your development process?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use an agile methodology with discovery, design, iterative sprints, QA, deployment, and ongoing support, with regular check-ins and transparency."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide post-launch support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. We provide maintenance, security updates, performance optimization, and feature enhancements to keep your product running smoothly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What technologies do you work with?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We use React, React Native, Node.js, Python, AWS, Google Cloud, Azure, PostgreSQL, MongoDB, and more—selected based on project needs."
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main id="main-content">
          <Hero />
          <ScrollAnimate animation="fadeInUp">
            <Services />
          </ScrollAnimate>
          <ScrollAnimate animation="fadeInUp" className="w-full">
            <CaseStudies />
          </ScrollAnimate>
          {/* <Testimonials /> */}{/* Hidden for now */}
          <ScrollAnimate animation="fadeInUp" className="w-full">
            <Partners />
          </ScrollAnimate>
          <ScrollAnimate animation="fadeInUp" className="w-full">
            <About />
          </ScrollAnimate>
          <ScrollAnimate animation="fadeInUp" className="w-full">
            <FAQ />
          </ScrollAnimate>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
