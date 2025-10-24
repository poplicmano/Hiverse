import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "giveaways", label: "Giveaways" },
    { id: "features", label: "Features" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left nav links - Desktop only */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end mr-8">
            {navLinks.slice(0, 2).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Centered Logo */}
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300" />
              <button
                onClick={() => scrollToSection("home")}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center border-2 border-primary/50 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                data-testid="logo-button"
              >
                <span className="text-2xl font-bold text-primary-foreground">H</span>
              </button>
            </div>
          </div>

          {/* Right nav links - Desktop only */}
          <div className="hidden md:flex items-center gap-6 flex-1 ml-8">
            {navLinks.slice(2).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://discord.gg/JQ9RyTvE8w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="sm" data-testid="button-join-nav">
                Join Us
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu-toggle">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-left text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                      data-testid={`link-mobile-${link.id}`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <a
                    href="https://discord.gg/JQ9RyTvE8w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    <Button variant="default" className="w-full" data-testid="button-join-mobile">
                      Join Us
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
