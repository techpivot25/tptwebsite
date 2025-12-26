import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "FinanceFlow",
    rating: 5,
    content: "TechPivot transformed our legacy systems into a modern, scalable platform. Their expertise in AI integration helped us reduce processing time by 60%.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CEO",
    company: "HealthTech Solutions",
    rating: 5,
    content: "The team delivered our healthcare app on time and exceeded expectations. Their attention to security and compliance was impressive.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Director",
    company: "RetailPro",
    rating: 5,
    content: "Working with TechPivot felt like having an extension of our team. They understood our vision and brought it to life beautifully.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder",
    company: "EduLearn",
    rating: 5,
    content: "Their AI expertise helped us build a personalized learning platform that has transformed how our students engage with content.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "VP Engineering",
    company: "LogiChain",
    rating: 5,
    content: "TechPivot's cloud migration expertise saved us months of work. Their team is incredibly knowledgeable and responsive.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const rafRef = useRef<number | null>(null);

  const checkScroll = useCallback(() => {
    // Cancel any pending RAF to avoid stacking
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Use RAF to batch the DOM reads and state updates
    rafRef.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    });
  }, []);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Delay check to allow smooth scroll to complete
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Geometric decoration */}
      <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-border to-transparent" />
      
      <div className="container px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mt-4 text-foreground">
              What Clients Say
            </h2>
          </div>
          
          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonials Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="scroll-container flex gap-6 pb-4"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="scroll-item w-[350px] md:w-[400px] bg-background border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-bold text-foreground">5.0</span>
            <span className="text-muted-foreground">on Clutch</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-muted-foreground">
            <span className="font-bold text-foreground">98%</span> Client Satisfaction
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-muted-foreground">
            <span className="font-bold text-foreground">500+</span> Projects Delivered
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;