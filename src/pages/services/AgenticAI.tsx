import { Helmet } from "react-helmet-async";
import { Bot, Brain, MessageSquare, Workflow, RefreshCw, ShieldCheck, Headphones, Briefcase, Search, TrendingUp } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import ScrollRevealText from "@/components/ScrollRevealText";
import { GLOBAL_AREA_SERVED, OG_LOCALE_ALTERNATES } from "@/lib/seo";

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
    <>
      <Helmet>
        <title>Agentic AI Solutions | TechPivot</title>
        <meta name="description" content="Autonomous agents that understand, reason, plan, and act to achieve business goals." />
        <link rel="canonical" href="https://techpivot.in/services/agentic-ai" />
        <meta property="og:title" content="Agentic AI Solutions | TechPivot" />
        <meta property="og:description" content="Autonomous intelligence for complex workflows and decisions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://techpivot.in/services/agentic-ai" />
        <meta property="og:image" content="https://techpivot.in/og/services/agentic-ai.jpg" />
        <meta property="og:site_name" content="TechPivot" />
        <meta property="og:locale" content="en_US" />
        {OG_LOCALE_ALTERNATES.map(locale => (
          <meta key={`og-locale-${locale}`} property="og:locale:alternate" content={locale} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agentic AI Solutions | TechPivot" />
        <meta name="twitter:description" content="Autonomous intelligence for complex workflows and decisions." />
        <meta name="twitter:image" content="https://techpivot.in/og/services/agentic-ai.jpg" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": "https://techpivot.in/services/agentic-ai#service",
              "name": "Agentic AI Solutions",
              "serviceType": "Autonomous AI Agents",
              "description": "Intelligent autonomous agents that understand, reason, and act to achieve business goals.",
              "provider": {
                "@type": "Organization",
                "@id": "https://techpivot.in/#organization",
                "name": "TechPivot Technologies & Consulting",
                "url": "https://techpivot.in/",
                "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)}
              },
              "areaServed": ${JSON.stringify(GLOBAL_AREA_SERVED)},
              "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://techpivot.in/services/agentic-ai"
              }
            }
          `}
        </script>
      </Helmet>
      <ServicePageLayout
        title="Agentic AI Solutions"
        subtitle="Autonomous Intelligence"
        description="Intelligent autonomous agents that understand, reason, and act to achieve your business goals with minimal human intervention."
        icon={<Bot className="w-8 h-8 text-primary" />}
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
        <section className="py-20 lg:py-28 animate-section relative">
          <div className="container px-6 lg:px-12">
            <ScrollRevealText direction="up" duration={0.8} delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
                Key Capabilities
              </h2>
            </ScrollRevealText>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="p-6 bg-card rounded-xl border border-border/50 hover-lift group cursor-pointer"
                >
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

        {/* Real-World Applications */}
        <section className="py-20 lg:py-28 animate-section">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              Real-World Applications
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {applications.map((app) => (
                <div
                  key={app.title}
                  className="p-8 bg-card rounded-2xl border border-border/50 hover-lift"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <app.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{app.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{app.description}</p>
                  <ul className="space-y-2">
                    {app.features.map((feature) => (
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

        {/* Technology Stack */}
        <section className="py-20 lg:py-28 animate-section relative">
          <div className="container px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
              Our Technology Stack
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              We leverage the latest advancements in AI and LLM technology to build powerful agentic systems
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div key={tech.category} className="p-6 bg-card rounded-xl border border-border/50 text-center">
                  <h3 className="font-semibold text-foreground mb-2">{tech.category}</h3>
                  <p className="text-sm text-muted-foreground">{tech.items}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
};

export default AgenticAI;
