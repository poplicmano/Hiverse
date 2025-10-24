import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const giveaways = pgTable("giveaways", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const insertGiveawaySchema = createInsertSchema(giveaways).omit({
  id: true,
  createdAt: true,
});

export type InsertGiveaway = z.infer<typeof insertGiveawaySchema>;
export type Giveaway = typeof giveaways.$inferSelect;

// Admin authentication type
export const adminVerifySchema = z.object({
  password: z.string(),
});

export type AdminVerify = z.infer<typeof adminVerifySchema>;
