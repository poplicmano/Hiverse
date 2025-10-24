import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminPanel } from "./AdminPanel";
import { SiDiscord } from "react-icons/si";

export function Footer() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <footer className="bg-card border-t border-card-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Hiverse</h3>
              <p className="text-muted-foreground text-sm">
                A premium Discord community featuring giveaways, events, and exclusive content.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "About", "Giveaways", "Features"].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(link.toLowerCase());
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Join Us</h4>
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
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Hiverse. All rights reserved.
            </p>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAdminOpen(true)}
              className="text-xs"
              data-testid="button-admin-access"
            >
              Giveaways Admin
            </Button>
          </div>
        </div>
      </footer>

      <AdminPanel
        open={adminOpen}
        onOpenChange={setAdminOpen}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    </>
  );
}
