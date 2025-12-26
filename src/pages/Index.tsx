import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TechPivot Technologies & Consulting | Digital Transformation Partner</title>
        <meta
          name="description"
          content="TechPivot delivers cutting-edge AI, SaaS, mobile app development and cloud solutions. 98% client satisfaction with global offices in India, USA, Canada, and UAE."
        />
        <meta name="keywords" content="AI development, SaaS development, mobile apps, cloud solutions, digital transformation, software consulting" />
        <link rel="canonical" href="https://techpivot.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <CaseStudies />
          <Testimonials />
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
