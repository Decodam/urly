import { z } from "zod";
import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

// Define the schema for the short links
export const shortLinks = pgTable("short_links", {
  id: serial("id").primaryKey(), // Auto-incrementing primary key
  key: varchar("key", { length: 255 }).unique().notNull(), // Unique key for the short link
  value: varchar("value", { length: 2048 }).notNull(), // Original URL
  ownerID: varchar("owner_id", { length: 255 }).notNull(), // Owner ID
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Optional: Define a Zod schema for validation if needed
export const shortLinkSchema = z.object({
  key: z.string().max(255),
  value: z.string().url(),
  ownerID: z.string().max(255).optional(),
  createdAt: z.date().default(() => new Date()),
});
