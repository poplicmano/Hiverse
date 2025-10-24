import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Gift, Trophy, Handshake, Star } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Active Community",
    description: "Join thousands of active members engaging in daily conversations and activities.",
  },
  {
    icon: Gift,
    title: "Frequent Giveaways",
    description: "Regular giveaways featuring exclusive prizes and rewards for our community members.",
  },
  {
    icon: Trophy,
    title: "Events & Contests",
    description: "Participate in exciting events, competitions, and challenges with amazing prizes.",
  },
  {
    icon: Handshake,
    title: "Partnership Opportunities",
    description: "Explore collaboration possibilities and grow together with our community network.",
  },
  {
    icon: Star,
    title: "Multiverse-Themed Ranks & Roles",
    description: "Unlock unique roles and ranks as you explore different dimensions of our community.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Hiverse?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what makes our community unique and valuable for every member.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover-elevate transition-all duration-300 hover:scale-105"
                data-testid={`card-feature-${index}`}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle data-testid={`text-feature-title-${index}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
