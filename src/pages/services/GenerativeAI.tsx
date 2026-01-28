import { Sparkles, FileText, Image, Code, Video, Music, Palette, ShoppingCart, Megaphone, Film } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceFAQ from "@/components/ServiceFAQ";
import { AppleCardCompact, AppleCardFeature } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-bg-generative-ai.jpg";

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

const faqs = [
  {
    question: "What types of content can Generative AI create?",
    answer: "Our Generative AI solutions can create a wide range of content including text (articles, product descriptions, marketing copy), images (product visuals, creative assets, graphics), code (automated development, bug fixes), video (promotional content, tutorials), and audio (voiceovers, music, sound effects)."
  },
  {
    question: "How do you ensure the quality of AI-generated content?",
    answer: "We implement multi-layer quality assurance including human review workflows, content validation algorithms, brand guideline checks, and iterative refinement processes. Our custom models are fine-tuned on your specific requirements to ensure consistent, high-quality output."
  },
  {
    question: "Can the AI be trained on our company's brand voice?",
    answer: "Absolutely. We specialize in fine-tuning models on your brand guidelines, tone of voice, and content style. This ensures all generated content aligns perfectly with your brand identity and maintains consistency across all channels."
  },
  {
    question: "What's the typical timeline for implementing a Generative AI solution?",
    answer: "Implementation timelines vary based on complexity. A basic content generation solution can be deployed in 4-6 weeks, while more complex custom model training and integration projects typically take 8-12 weeks. We provide detailed timelines during the discovery phase."
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We follow strict data privacy protocols including data encryption, secure processing environments, and compliance with GDPR, CCPA, and other regulations. Your training data and generated content remain confidential and secure."
  },
];

const GenerativeAI = () => {
  return (
    <ServicePageLayout
      title="Generative AI Solutions"
      subtitle="Creative Intelligence"
      description="Scale creative output and innovation with AI-generated content, designs, and synthetic data that boost creativity and efficiency."
      icon={<Sparkles className="w-8 h-8 text-primary" />}
      backgroundImage={heroBg}
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
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Generative Capabilities
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <AnimatedSection key={cap.title} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  icon={cap.icon}
                  title={cap.title}
                  description={cap.description}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Industry Solutions
            </h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-3 gap-6">
            {industries.map((ind, index) => (
              <AnimatedSection key={ind.title} animation="fadeUp" delay={index * 100}>
                <AppleCardFeature
                  icon={ind.icon}
                  title={ind.title}
                  description={ind.description}
                  features={ind.features}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ServiceFAQ faqs={faqs} serviceName="Generative AI" />
    </ServicePageLayout>
  );
};

export default GenerativeAI;
