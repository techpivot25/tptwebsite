import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>FAQ | TechPivot Technologies & Consulting</title>
        <meta
          name="description"
          content="Frequently asked questions about TechPivot's services, development process, technologies, and engagement models."
        />
        <link rel="canonical" href="https://techpivot.com/faq" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
