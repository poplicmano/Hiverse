import { type Giveaway, type InsertGiveaway } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getGiveaways(): Promise<Giveaway[]>;
  getGiveaway(id: string): Promise<Giveaway | undefined>;
  createGiveaway(giveaway: InsertGiveaway): Promise<Giveaway>;
  endGiveaway(id: string): Promise<Giveaway | undefined>;
}

export class MemStorage implements IStorage {
  private giveaways: Map<string, Giveaway>;

  constructor() {
    this.giveaways = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleGiveaways: InsertGiveaway[] = [
      {
        title: "Discord Nitro Giveaway",
        description: "Win 1 month of Discord Nitro! Join our server and participate in this exclusive giveaway.",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        isActive: true,
      },
      {
        title: "$50 Steam Gift Card",
        description: "Grab your chance to win a $50 Steam Gift Card! Perfect for your next gaming purchase.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop",
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        isActive: true,
      },
    ];

    for (const giveaway of sampleGiveaways) {
      const id = randomUUID();
      this.giveaways.set(id, {
        ...giveaway,
        id,
        isActive: giveaway.isActive ?? true,
        createdAt: new Date(),
      });
    }
  }

  async getGiveaways(): Promise<Giveaway[]> {
    return Array.from(this.giveaways.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getGiveaway(id: string): Promise<Giveaway | undefined> {
    return this.giveaways.get(id);
  }

  async createGiveaway(insertGiveaway: InsertGiveaway): Promise<Giveaway> {
    const id = randomUUID();
    const giveaway: Giveaway = {
      ...insertGiveaway,
      id,
      isActive: insertGiveaway.isActive ?? true,
      createdAt: new Date(),
    };
    this.giveaways.set(id, giveaway);
    return giveaway;
  }

  async endGiveaway(id: string): Promise<Giveaway | undefined> {
    const giveaway = this.giveaways.get(id);
    if (!giveaway) return undefined;

    const updated: Giveaway = {
      ...giveaway,
      isActive: false,
    };
    this.giveaways.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
