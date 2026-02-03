import { Sparkles, FileText, Image, Code, Video, Music, Palette, ShoppingCart, Megaphone, Film } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import ServiceFAQ from "@/components/ServiceFAQ";
import { AppleCardCompact, AppleCardFeature } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";

const capabilities = [
  { 
    icon: FileText, 
    title: "Advanced Text Generation", 
    description: "Create high-quality articles, blog posts, product descriptions, technical documentation, marketing copy, and customer communications at scale using state-of-the-art language models fine-tuned for your brand voice" 
  },
  { 
    icon: Image, 
    title: "AI Image & Visual Creation", 
    description: "Generate stunning custom visuals, product images, marketing materials, brand assets, and creative designs using DALL-E, Midjourney, and Stable Diffusion with brand consistency" 
  },
  { 
    icon: Code, 
    title: "Intelligent Code Generation", 
    description: "Accelerate software development with AI-assisted coding, automated testing, code refactoring, documentation generation, and bug detection across 50+ programming languages" 
  },
  { 
    icon: Video, 
    title: "Video & Animation Creation", 
    description: "Produce professional promotional videos, explainer content, social media clips, video ads, and animated presentations with AI-powered editing and voiceovers" 
  },
  { 
    icon: Music, 
    title: "Audio & Voice Synthesis", 
    description: "Generate natural-sounding voiceovers in 100+ languages, background music, sound effects, podcasts, and audio advertisements with emotion and tone control" 
  },
  { 
    icon: Palette, 
    title: "Custom Model Training", 
    description: "Fine-tune foundation models on your proprietary data, industry knowledge, and brand guidelines to create bespoke AI systems that understand your unique business context" 
  },
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
      description="Scale creative output and innovation with AI-generated content, designs, and synthetic data that boost creativity and efficiency. Leverage advanced foundation models like GPT-4, Claude, DALL-E, and Midjourney to automate content creation, enhance productivity, and unlock unprecedented creative possibilities across your organization."
      icon={<Sparkles className="w-8 h-8 text-primary" />}
    >
      {/* Overview */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Transform Your Creative Workflow
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Generative AI represents a paradigm shift in how organizations create content and automate workflows. Our solutions harness advanced foundation models to generate high-quality text, images, code, and video at unprecedented scale. Whether you need to produce marketing content at volume, accelerate software development with AI-assisted coding, create personalized customer experiences, or generate synthetic data for training, our expertise ensures successful implementation. We handle model selection, fine-tuning on your data, integration with existing systems, quality assurance, and deployment. Our approach combines cutting-edge technology with practical business value, delivering measurable ROI through increased productivity, reduced content costs, faster time-to-market, and enhanced customer engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Capabilities
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
