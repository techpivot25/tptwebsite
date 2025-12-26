import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
  serviceName?: string;
}

const ServiceFAQ = ({ faqs, serviceName = "this service" }: ServiceFAQProps) => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30 animate-section">
      <div className="container px-6 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase mb-4">
            FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
          </h2>
          <p className="text-muted-foreground">
            Common questions about {serviceName}.
          </p>
        </div>

        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border/50 py-1"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 max-w-3xl">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
          >
            Have more questions? Contact us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
