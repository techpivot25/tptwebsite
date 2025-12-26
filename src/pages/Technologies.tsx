import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const techCategories = [
  { title: "Frontend", items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Python", "Java", "Go", ".NET", "Ruby on Rails"] },
  { title: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"] },
  { title: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"] },
  { title: "AI & ML", items: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face", "Pinecone"] },
  { title: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB", "Supabase"] },
];

const Technologies = () => (
  <>
    <Helmet>
      <title>Technologies | TechPivot</title>
      <meta name="description" content="Explore the cutting-edge technologies we use at TechPivot." />
    </Helmet>
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Our Technology Stack</h1>
            <p className="text-lg text-muted-foreground">We leverage cutting-edge technologies to build scalable, secure, and innovative solutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCategories.map((cat) => (
              <div key={cat.title} className="p-6 bg-card rounded-xl border border-border/50">
                <h3 className="text-xl font-semibold text-foreground mb-4">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{item}</span>
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
