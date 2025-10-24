import { Button } from "@/components/ui/button";
import { ParticleBackground } from "./ParticleBackground";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background/95 to-background pt-20"
    >
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative inline-block">
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary animate-in zoom-in duration-700">
              HIVERSE
            </h1>
            <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 animate-pulse" />
          </div>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Welcome to the multiverse. Join our exclusive Discord community for giveaways, events, and endless possibilities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <a
              href="https://discord.gg/JQ9RyTvE8w"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                data-testid="button-join-now"
              >
                Join Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
