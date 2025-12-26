import { useEffect } from "react";

declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

const Hero = () => {
  useEffect(() => {
    const win = window as Window;
    if (!win.UnicornStudio) {
      win.UnicornStudio = { isInitialized: false, init: () => {} };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.3/dist/unicornStudio.umd.js";
      script.onload = function () {
        if (!win.UnicornStudio.isInitialized) {
          win.UnicornStudio.init();
          win.UnicornStudio.isInitialized = true;
        }
      };
      document.head.appendChild(script);
    } else if (!win.UnicornStudio.isInitialized) {
      win.UnicornStudio.init();
      win.UnicornStudio.isInitialized = true;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* UnicornStudio Animation Background */}
      <div className="absolute inset-0">
        <div 
          data-us-project="Dm1DjFxRRpslwJBORUBN" 
          className="w-full h-full"
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/50 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 lg:px-12 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8 animate-fade-up backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Innovation • Excellence • Collaboration • Growth
            </span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "98%", label: "Client Satisfaction" },
              { value: "500+", label: "Projects Delivered" },
              { value: "4", label: "Global Offices" },
              { value: "24/7", label: "Support Coverage" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
