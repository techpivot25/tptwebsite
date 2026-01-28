import { Bot, Brain, MessageSquare, Workflow, RefreshCw, ShieldCheck, Headphones, Briefcase, Search, TrendingUp } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact, AppleCardFeature } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import heroBg from "@/assets/hero-bg-agentic-ai.jpg";

const capabilities = [
  {
    icon: Brain,
    title: "Autonomous Decision Making",
    description: "AI agents that can analyze situations, evaluate options, and make informed decisions without human intervention",
  },
  {
    icon: Workflow,
    title: "Multi-Step Planning",
    description: "Break down complex goals into actionable steps and execute sophisticated workflows automatically",
  },
  {
    icon: MessageSquare,
    title: "Natural Interaction",
    description: "Communicate with agents using natural language and receive intelligent, context-aware responses",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning",
    description: "Learn from interactions and outcomes to improve performance and accuracy over time",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Controllable",
    description: "Built-in guardrails and oversight mechanisms to ensure agents operate within defined boundaries",
  },
];

const applications = [
  {
    icon: Headphones,
    title: "Customer Support Automation",
    description: "Deploy intelligent agents that handle inquiries, troubleshoot issues, and escalate complex cases while maintaining context.",
    features: ["24/7 availability with instant responses", "Multi-channel support (chat, email, voice)", "Automatic ticket creation and routing", "Sentiment analysis and priority detection"],
  },
  {
    icon: Briefcase,
    title: "Business Process Automation",
    description: "Automate complex workflows across multiple systems, from data entry to approval processes.",
    features: ["Invoice processing and reconciliation", "HR onboarding and document management", "Compliance monitoring and reporting", "Supply chain optimization"],
  },
  {
    icon: Search,
    title: "Research & Analysis Agents",
    description: "Agents that research topics, gather data from multiple sources, and produce comprehensive reports.",
    features: ["Market research and competitive analysis", "Financial data analysis and reporting", "Scientific literature review", "Trend identification and forecasting"],
  },
  {
    icon: TrendingUp,
    title: "Sales & Marketing Assistants",
    description: "AI agents that qualify leads, personalize outreach, and nurture prospects through the sales funnel.",
    features: ["Lead qualification and scoring", "Personalized email campaigns", "Social media scheduling", "CRM data enrichment"],
  },
];

const techStack = [
  { category: "Foundation Models", items: "GPT-4, Claude 3, Gemini, LLaMA" },
  { category: "Agent Frameworks", items: "LangGraph, AutoGPT, CrewAI" },
  { category: "Vector Databases", items: "Pinecone, Weaviate, Chroma" },
  { category: "Integration Tools", items: "APIs, Webhooks, Custom Connectors" },
];

const AgenticAI = () => {
  return (
    <ServicePageLayout
      title="Agentic AI Solutions"
      subtitle="Autonomous Intelligence"
      description="Intelligent autonomous agents that understand, reason, and act to achieve your business goals with minimal human intervention."
      icon={<Bot className="w-8 h-8 text-primary" />}
      backgroundImage={heroBg}
    >
      {/* What is Agentic AI */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What is Agentic AI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Agentic AI represents the next evolution in artificial intelligence - autonomous agents 
              capable of complex reasoning, planning, and action. These intelligent agents can interact 
              with multiple systems, gather information, make decisions based on context, and execute 
              multi-step workflows while learning and improving from each interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Capabilities
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Real-World Applications */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real-World Applications
            </h2>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-6">
            {applications.map((app, index) => (
              <AnimatedSection key={app.title} animation="fadeUp" delay={index * 100}>
                <AppleCardFeature
                  icon={app.icon}
                  title={app.title}
                  description={app.description}
                  features={app.features}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We leverage the latest advancements in AI and LLM technology to build powerful agentic systems
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <AnimatedSection key={tech.category} animation="fadeUp" delay={index * 100}>
                <AppleCardCompact
                  title={tech.category}
                  description={tech.items}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
};

export default AgenticAI;
