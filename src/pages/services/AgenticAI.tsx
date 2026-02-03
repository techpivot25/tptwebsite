import { Bot, Brain, MessageSquare, Workflow, RefreshCw, ShieldCheck, Headphones, Briefcase, Search, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";
import { AppleCardCompact, AppleCardFeature } from "@/components/ui/apple-card";
import AnimatedSection from "@/components/AnimatedSection";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const capabilities = [
  {
    icon: Brain,
    title: "Autonomous Decision Making",
    description: "AI agents that analyze complex situations, evaluate multiple options, and make data-driven decisions autonomously with full transparency and auditability",
  },
  {
    icon: Workflow,
    title: "Multi-Step Planning & Execution",
    description: "Break down complex business goals into actionable steps, coordinate across multiple systems, and execute sophisticated workflows with error recovery",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Understanding",
    description: "Communicate with agents using natural language across 100+ languages with context retention, intent recognition, and nuanced response generation",
  },
  {
    icon: RefreshCw,
    title: "Continuous Learning & Adaptation",
    description: "Agents that learn from every interaction, incorporate feedback, and continuously improve their accuracy, efficiency, and decision quality over time",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Safety & Governance",
    description: "Built-in guardrails, human-in-the-loop oversight, comprehensive audit trails, and configurable boundaries to ensure safe, compliant operation",
  },
];

const applications = [
  {
    icon: Headphones,
    title: "24/7 Customer Support Automation",
    description: "Deploy intelligent agents that handle complex inquiries, troubleshoot multi-step issues, and seamlessly escalate to humans while maintaining full context.",
    features: ["24/7 availability with sub-second response times", "Multi-channel support (chat, email, voice, social)", "Automatic ticket creation, routing, and resolution", "Sentiment analysis, priority detection, and VIP handling"],
  },
  {
    icon: Briefcase,
    title: "Enterprise Process Automation",
    description: "Automate complex, cross-functional workflows spanning multiple systems, departments, and approval chains with intelligent exception handling.",
    features: ["Invoice processing, matching, and reconciliation", "HR onboarding, offboarding, and document management", "Compliance monitoring, reporting, and audit preparation", "Supply chain optimization and vendor management"],
  },
  {
    icon: Search,
    title: "Research & Analysis Agents",
    description: "Autonomous agents that research topics across diverse sources, synthesize findings, and produce comprehensive reports with cited references.",
    features: ["Market research and competitive intelligence", "Financial data analysis and investment research", "Scientific literature review and synthesis", "Trend identification, forecasting, and anomaly detection"],
  },
  {
    icon: TrendingUp,
    title: "Sales & Marketing Assistants",
    description: "AI agents that qualify leads, craft personalized outreach, nurture prospects, and accelerate deals through the entire sales funnel.",
    features: ["Lead qualification, scoring, and prioritization", "Personalized email sequences and follow-ups", "Social media monitoring and engagement", "CRM data enrichment and opportunity insights"],
  },
];

const techStack = [
  { category: "Foundation Models", items: "GPT-4, Claude 3, Gemini Pro, LLaMA 3" },
  { category: "Agent Frameworks", items: "LangGraph, AutoGPT, CrewAI, AgentGPT" },
  { category: "Vector Databases", items: "Pinecone, Weaviate, Chroma, Milvus" },
  { category: "Integration Tools", items: "APIs, Webhooks, Zapier, Custom Connectors" },
];

const AgenticAI = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ServicePageLayout
      title="Agentic AI Solutions"
      subtitle="Autonomous Intelligence"
      description="Intelligent autonomous agents that understand, reason, and act to achieve your business goals with minimal human intervention. Powered by advanced language models, these AI agents can execute multi-step workflows, integrate with your systems, make informed decisions, and continuously learn from interactions."
      icon={<Bot className="w-8 h-8 text-primary" />}
      showVectorMesh={true}
    >
      {/* What is Agentic AI */}
      <section className="py-20 lg:py-28 animate-section">
        <div className="container px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What is Agentic AI?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Agentic AI represents the next evolution in artificial intelligence - autonomous agents capable of complex reasoning, planning, and action. These intelligent agents can interact with multiple systems, gather information, make decisions based on context, and execute multi-step workflows while learning and improving from each interaction. Unlike traditional software that follows predefined rules, agentic AI systems demonstrate goal-oriented behavior, can handle novel situations, adapt strategies based on feedback, and collaborate with humans and other systems seamlessly. Our expertise spans designing agent architectures, implementing specialized tool integrations, creating safety guardrails, and optimizing for your specific use cases. Common applications include 24/7 customer support, enterprise process automation, research and data analysis, sales pipeline management, and complex decision support systems.
            </p>
          </div>
        </div>
      </section>

      {/* Key Capabilities - Scrollable */}
      <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
        <div className="container px-6 lg:px-12">
          <AnimatedSection animation="fadeUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Key Capabilities
            </h2>
          </AnimatedSection>
          
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll('left')}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background shadow-lg border border-border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft ? 'opacity-100 hover:bg-primary hover:text-primary-foreground' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => scroll('right')}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background shadow-lg border border-border flex items-center justify-center transition-all duration-300 ${
                canScrollRight ? 'opacity-100 hover:bg-primary hover:text-primary-foreground' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-8 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {capabilities.map((cap, index) => (
                <motion.div 
                  key={cap.title} 
                  className="flex-shrink-0 w-80 snap-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AppleCardCompact
                    icon={cap.icon}
                    title={cap.title}
                    description={cap.description}
                  />
                </motion.div>
              ))}
            </div>
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
