import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroVectorAnimation from "@/components/HeroVectorAnimation";
import { AppleCardCompact } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const techCategories = [
  { 
    title: "Frontend", 
    items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
    description: "Modern frameworks for building responsive, performant user interfaces."
  },
  { 
    title: "Backend", 
    items: ["Node.js", "Python", "Java", "Go", ".NET", "Ruby on Rails"],
    description: "Robust server-side technologies for scalable applications."
  },
  { 
    title: "Mobile", 
    items: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"],
    description: "Cross-platform and native mobile development solutions."
  },
  { 
    title: "Cloud & DevOps", 
    items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    description: "Enterprise-grade infrastructure and deployment automation."
  },
  { 
    title: "AI & ML", 
    items: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face", "Pinecone"],
    description: "Cutting-edge artificial intelligence and machine learning tools."
  },
  { 
    title: "Databases", 
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB", "Supabase"],
    description: "Reliable data storage and management solutions."
  },
];

const Technologies = () => (
  <>
    <Helmet>
      <title>Technologies | TechPivot</title>
      <meta name="description" content="Explore the cutting-edge technologies we use at TechPivot." />
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
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              TECHNOLOGIES
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background tracking-tight mb-6">
              Technology Excellence
            </h1>
            <p className="text-xl text-background/70 mb-10">
              We leverage cutting-edge technologies to build scalable, secure, and innovative solutions for our clients.
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

      {/* Technologies Grid */}
      <section className="py-20 lg:py-28">
        <div className="container px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((cat, index) => (
              <AnimatedSection key={cat.title} animation="fadeUp" delay={index * 100}>
                <div className="group h-full">
                  <div className="relative h-full bg-[#f5f5f7] dark:bg-card rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {cat.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((item) => (
                          <span 
                            key={item} 
                            className="px-3 py-1.5 bg-background/80 dark:bg-background/50 border border-border/50 text-foreground text-sm rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default Technologies;
