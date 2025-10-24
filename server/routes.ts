import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGiveawaySchema, adminVerifySchema } from "@shared/schema";

const ADMIN_PASSWORD = "Hiverse2025";
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

async function sendDiscordWebhook(title: string, description: string, imageUrl: string, isEnded: boolean = false) {
  if (!DISCORD_WEBHOOK_URL) {
    console.log("Discord webhook URL not configured, skipping notification");
    return;
  }

  try {
    const embed = {
      title: isEnded ? `🎉 Giveaway Ended: ${title}` : `🎁 New Giveaway: ${title}`,
      description,
      color: isEnded ? 0xff0000 : 0x5865f2,
      image: {
        url: imageUrl,
      },
      timestamp: new Date().toISOString(),
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error("Failed to send Discord webhook:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/giveaways", async (_req, res) => {
    try {
      const giveaways = await storage.getGiveaways();
      res.json(giveaways);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch giveaways" });
    }
  });

  app.post("/api/giveaways", async (req, res) => {
    try {
      const parsed = insertGiveawaySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid giveaway data" });
      }

      const giveaway = await storage.createGiveaway(parsed.data);

      await sendDiscordWebhook(
        giveaway.title,
        giveaway.description,
        giveaway.imageUrl,
        false
      );

      res.json(giveaway);
    } catch (error) {
      res.status(500).json({ error: "Failed to create giveaway" });
    }
  });

  app.patch("/api/giveaways/:id/end", async (req, res) => {
    try {
      const { id } = req.params;
      const giveaway = await storage.endGiveaway(id);

      if (!giveaway) {
        return res.status(404).json({ error: "Giveaway not found" });
      }

      await sendDiscordWebhook(
        giveaway.title,
        `This giveaway has ended. Thank you to all participants!`,
        giveaway.imageUrl,
        true
      );

      res.json(giveaway);
    } catch (error) {
      res.status(500).json({ error: "Failed to end giveaway" });
    }
  });

  app.post("/api/admin/verify", async (req, res) => {
    try {
      const parsed = adminVerifySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request" });
      }

      if (parsed.data.password === ADMIN_PASSWORD) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
