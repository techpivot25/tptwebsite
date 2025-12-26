import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does TechPivot offer?",
    answer: "We offer a comprehensive suite of digital services including custom software development, AI & machine learning solutions, mobile app development, cloud infrastructure, SaaS platform development, and IT staff augmentation. Our team specializes in building scalable, enterprise-grade solutions tailored to your business needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on complexity and scope. A simple MVP can take 4-8 weeks, while enterprise solutions may require 3-6 months. During our discovery phase, we provide detailed timelines and milestones to ensure transparency throughout the development process."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile methodology with iterative development cycles. Our process includes discovery & planning, UI/UX design, development sprints, quality assurance, deployment, and ongoing support. You'll have regular check-ins and access to project updates throughout."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Absolutely. We offer comprehensive maintenance and support packages including bug fixes, security updates, performance optimization, and feature enhancements. Our team ensures your application runs smoothly and evolves with your business needs."
  },
  {
    question: "What technologies do you work with?",
    answer: "Our tech stack includes React, React Native, Node.js, Python, AWS, Google Cloud, Azure, PostgreSQL, MongoDB, and more. We select the best technologies based on your project requirements, scalability needs, and long-term maintenance considerations."
  },
  {
    question: "How do you ensure project quality?",
    answer: "Quality is embedded in our process. We implement code reviews, automated testing, CI/CD pipelines, and rigorous QA protocols. Our projects undergo multiple testing phases including unit, integration, and user acceptance testing before deployment."
  },
  {
    question: "Can you work with our existing team?",
    answer: "Yes, we offer flexible engagement models. Whether you need a dedicated team, staff augmentation, or project-based collaboration, we seamlessly integrate with your existing workflows, tools, and communication channels."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve diverse industries including healthcare, fintech, e-commerce, logistics, education, and enterprise. Our cross-industry experience allows us to bring best practices and innovative solutions to every project."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase mb-6">
            FREQUENTLY ASKED
            <br />
            <span className="text-primary">QUESTIONS</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about working with us. Can't find the answer you're looking for? Reach out to our team.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border/50 py-2"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-foreground hover:text-primary hover:no-underline transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-16 border-t border-border/50 max-w-4xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground">Our team is here to help you get started.</p>
            </div>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Contact Us
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
