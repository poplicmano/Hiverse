import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const founders = [
  {
    name: "Kuzma",
    role: "Founder of Hiverse",
    description: "Visionary leader passionate about building inclusive communities and creating unforgettable experiences for our members.",
    initials: "K",
  },
  {
    name: "Hamza",
    role: "Founder of Hiverse",
    description: "Community architect dedicated to fostering connections and delivering value through innovative events and partnerships.",
    initials: "H",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Founders</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The visionaries behind Hiverse, committed to building the ultimate Discord community experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <Card
              key={founder.name}
              className="group hover-elevate overflow-hidden transition-all duration-300 hover:scale-105"
              data-testid={`card-founder-${index}`}
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                  <Avatar className="w-24 h-24 border-4 border-primary/30 shadow-lg relative">
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-blue-500 text-primary-foreground">
                      {founder.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground" data-testid={`text-founder-name-${index}`}>
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-primary" data-testid={`text-founder-role-${index}`}>
                    {founder.role}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed" data-testid={`text-founder-description-${index}`}>
                  {founder.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
