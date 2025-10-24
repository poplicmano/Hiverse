import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SiDiscord } from "react-icons/si";

export function DiscordPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearTimeout(timer);
  }, [hasShown]);

  useEffect(() => {
    if (!isVisible || !hasShown) return;

    const interval = setInterval(() => {
      setIsVisible(true);
    }, 10 * 60 * 1000); // Show every 10 minutes

    return () => clearInterval(interval);
  }, [isVisible, hasShown]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
      data-testid="popup-discord"
    >
      <Card className="w-80 shadow-2xl border-primary/20">
        <CardHeader className="relative pb-3">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => setIsVisible(false)}
            data-testid="button-close-popup"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <SiDiscord className="w-7 h-7 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Join Hiverse</CardTitle>
              <CardDescription>Discord Community</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">1.2K+</div>
              <div className="text-xs text-muted-foreground">Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">350+</div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
          </div>

          <a
            href="https://discord.gg/JQ9RyTvE8w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full" variant="default" data-testid="button-join-popup">
              Join Now
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
