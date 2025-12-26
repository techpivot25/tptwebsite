import { Sparkles, FileText, Image, Code, Video, Music, Palette, ShoppingCart, Megaphone, Film } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const capabilities = [
  { icon: FileText, title: "Text Generation", description: "Create articles, product descriptions, marketing copy, and documentation at scale" },
  { icon: Image, title: "Image Generation", description: "Generate custom visuals, product images, and creative assets" },
  { icon: Code, title: "Code Generation", description: "Accelerate development with AI-assisted coding and automation" },
  { icon: Video, title: "Video Generation", description: "Create promotional videos, tutorials, and animated content" },
  { icon: Music, title: "Audio Generation", description: "Produce voiceovers, music, and sound effects" },
  { icon: Palette, title: "Custom Models", description: "Fine-tuned models trained on your specific data and requirements" },
];

const industries = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Automated product descriptions, personalized recommendations, and visual content generation",
    features: ["Product description generation", "Image enhancement and creation", "Customer review summarization"],
  },
  {
    icon: Megaphone,
    title: "Marketing & Advertising",
    description: "AI-powered ad copy, campaign content, and creative asset generation at scale",
    features: ["Ad copy optimization", "Social media content", "Email campaign personalization"],
  },
  {
    icon: Film,
    title: "Media & Entertainment",
    description: "Script generation, content creation, and automated media production",
    features: ["Script and storyboard generation", "Subtitle and caption creation", "Content localization"],
  },
];

const GenerativeAI = () => {
  return (
    <ServicePageLayout
      title="Generative AI Solutions"
      subtitle="Creative Intelligence"
      description="Scale creative output and innovation with AI-generated content, designs, and synthetic data that boost creativity and efficiency."
      icon={<Sparkles className="w-8 h-8 text-primary" />}
    >
      {/* Overview */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Transform Your Creative Workflow
            </h2>
            <p className="text-lg text-muted-foreground">
              Generative AI enables unprecedented creative capabilities, from text and image generation 
              to code and video creation. Our solutions help businesses automate content creation, 
              personalize experiences, and unlock new creative possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Generative Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{cap.title}</h3>
                <p className="text-muted-foreground">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Industry Solutions
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <div key={ind.title} className="p-8 bg-card rounded-2xl border border-border/50 hover-lift">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <ind.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{ind.title}</h3>
                <p className="text-muted-foreground mb-4">{ind.description}</p>
                <ul className="space-y-2">
                  {ind.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default GenerativeAI;
