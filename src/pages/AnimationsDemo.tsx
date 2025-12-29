import { useState } from "react";
import { NeumorphicButton } from "@/components/ui/neumorphic-button";
import { HoverCardAnimated } from "@/components/ui/hover-card-animated";
import { HamburgerMenu } from "@/components/ui/hamburger-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AnimationsDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-6 lg:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Animation Components</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Reusable animation components for modern web experiences.
          </p>

          {/* Neumorphic Button Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">Neumorphic Buttons</h2>
            <p className="text-muted-foreground mb-8">
              Buttons with soft UI shadows that invert on hover, creating a pressed effect. 
              Text transitions to a gradient color on hover.
            </p>
            <div className="flex flex-wrap gap-6">
              <NeumorphicButton>
                Default Button
              </NeumorphicButton>
              <NeumorphicButton variant="primary">
                Primary Button
              </NeumorphicButton>
            </div>
          </section>

          {/* Hover Card Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">Animated Hover Cards</h2>
            <p className="text-muted-foreground mb-8">
              Product cards with zoom effect on images, lift animation, and dynamic drop shadows.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <HoverCardAnimated
                imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
                imageAlt="Code on screen"
              >
                <h3 className="text-xl font-semibold mb-2">Web Development</h3>
                <p className="text-muted-foreground">
                  Modern web applications built with cutting-edge technologies.
                </p>
              </HoverCardAnimated>

              <HoverCardAnimated
                imageUrl="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
                imageAlt="AI visualization"
              >
                <h3 className="text-xl font-semibold mb-2">AI Solutions</h3>
                <p className="text-muted-foreground">
                  Intelligent automation powered by machine learning.
                </p>
              </HoverCardAnimated>

              <HoverCardAnimated
                imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
                imageAlt="Analytics dashboard"
              >
                <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
                <p className="text-muted-foreground">
                  Transform data into actionable business insights.
                </p>
              </HoverCardAnimated>
            </div>
          </section>

          {/* Hamburger Menu Section */}
          <section className="mb-20">
            <h2 className="text-2xl font-semibold mb-6">Hamburger Menu Toggle</h2>
            <p className="text-muted-foreground mb-8">
              SVG-based hamburger icon that morphs into an X with smooth line rotations. 
              Click to toggle the animation.
            </p>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-4 p-8 bg-card border rounded-xl">
                <span className="text-sm text-muted-foreground">Light Background</span>
                <HamburgerMenu
                  isOpen={menuOpen}
                  onClick={() => setMenuOpen(!menuOpen)}
                  size={32}
                />
                <span className="text-xs text-muted-foreground">
                  {menuOpen ? "Open" : "Closed"}
                </span>
              </div>

              <div className="flex flex-col items-center gap-4 p-8 bg-foreground text-background rounded-xl">
                <span className="text-sm opacity-70">Dark Background</span>
                <HamburgerMenu
                  isOpen={menuOpen}
                  onClick={() => setMenuOpen(!menuOpen)}
                  size={32}
                  color="currentColor"
                />
                <span className="text-xs opacity-70">
                  {menuOpen ? "Open" : "Closed"}
                </span>
              </div>
            </div>
          </section>

          {/* Usage Code Examples */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
            
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Neumorphic Button</h3>
                <pre className="text-sm overflow-x-auto">
{`import { NeumorphicButton } from "@/components/ui/neumorphic-button";

<NeumorphicButton>Default</NeumorphicButton>
<NeumorphicButton variant="primary">Primary</NeumorphicButton>`}
                </pre>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Hover Card</h3>
                <pre className="text-sm overflow-x-auto">
{`import { HoverCardAnimated } from "@/components/ui/hover-card-animated";

<HoverCardAnimated
  imageUrl="https://example.com/image.jpg"
  imageAlt="Description"
>
  <h3>Title</h3>
  <p>Content goes here</p>
</HoverCardAnimated>`}
                </pre>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Hamburger Menu</h3>
                <pre className="text-sm overflow-x-auto">
{`import { HamburgerMenu } from "@/components/ui/hamburger-menu";

const [isOpen, setIsOpen] = useState(false);

<HamburgerMenu
  isOpen={isOpen}
  onClick={() => setIsOpen(!isOpen)}
  size={24}
/>`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnimationsDemo;
