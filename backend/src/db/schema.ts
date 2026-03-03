import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example app-specific table:
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // References Better Auth user.id
  title: text("title").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
