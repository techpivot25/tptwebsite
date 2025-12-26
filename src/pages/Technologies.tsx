import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";

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
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-foreground relative overflow-hidden">
        {/* Geometric decorations */}
        <div className="absolute -top-20 -right-20 w-80 h-80 border border-background/10 rounded-full" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-primary/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-primary/30 rounded-full" />

        <div className="container px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              OUR STACK
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background uppercase tracking-tight mt-4 mb-6">
              Technology Excellence
            </h1>
            <p className="text-xl text-background/70">
              We leverage cutting-edge technologies to build scalable, secure, and innovative solutions for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20 lg:py-28">
        <div className="container px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((cat, index) => (
              <div 
                key={cat.title} 
                className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span 
                      key={item} 
                      className="px-3 py-1.5 bg-muted border border-border text-foreground text-sm rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default Technologies;