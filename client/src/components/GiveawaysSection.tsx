import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Gift, Calendar } from "lucide-react";
import type { Giveaway } from "@shared/schema";

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
            Join our exciting giveaways and stand a chance to win amazing prizes!
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : activeGiveaways.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">No Active Giveaways</h3>
              <p className="text-muted-foreground">
                Check back soon for new giveaways or join our Discord to stay updated!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {activeGiveaways.map((giveaway, index) => (
              <Card
                key={giveaway.id}
                className="group hover-elevate overflow-hidden transition-all duration-300 hover:scale-105"
                data-testid={`card-giveaway-${index}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={giveaway.imageUrl}
                    alt={giveaway.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    data-testid={`img-giveaway-${index}`}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl" data-testid={`text-giveaway-title-${index}`}>
                      {giveaway.title}
                    </CardTitle>
                    <Badge variant="default" data-testid={`badge-active-${index}`}>
                      Active
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2" data-testid={`text-giveaway-description-${index}`}>
                    {giveaway.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span data-testid={`text-giveaway-enddate-${index}`}>
                      Ends {new Date(giveaway.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://discord.gg/JQ9RyTvE8w"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full" variant="default" data-testid={`button-join-giveaway-${index}`}>
                      Join Giveaway
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

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
