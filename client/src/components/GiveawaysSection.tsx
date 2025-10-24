import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Calendar } from "lucide-react";
import type { Giveaway } from "@shared/schema";
import { SiDiscord } from "react-icons/si";

export function GiveawaysSection() {
  const { data: giveaways, isLoading } = useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways"],
  });

  const activeGiveaways = giveaways?.filter((g) => g.isActive) || [];
  const pastGiveaways = giveaways?.filter((g) => !g.isActive) || [];

  return (
    <section id="giveaways" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Giveaways</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for giveaways and get a chance to win awesome prizes every week! It’s super easy to participate, fun to be part of the community, and you never know—you might be the next lucky winner. Don’t miss out on the excitement and rewards!
          </p>
          
          <a
                          href="https://discord.gg/JQ9RyTvE8w"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="default" className="w-full sm:w-auto" data-testid="button-join-footer">
                            <SiDiscord className="mr-2 h-5 w-5" />
                            Join Discord
                          </Button>
                        </a>
        </div>

        {pastGiveaways.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Past Giveaways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastGiveaways.map((giveaway, index) => (
                <Card
                  key={giveaway.id}
                  className="opacity-60 hover:opacity-80 transition-opacity"
                  data-testid={`card-past-giveaway-${index}`}
                >
                  <div className="aspect-video overflow-hidden grayscale">
                    <img
                      src={giveaway.imageUrl}
                      alt={giveaway.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl">
                        {giveaway.title}
                      </CardTitle>
                      <Badge variant="secondary">
                        Ended
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {giveaway.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
