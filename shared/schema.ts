import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  acceptsUpdates: boolean("accepts_updates").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageVisits = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries).pick({
  name: true,
  email: true,
  acceptsUpdates: true,
});

export const insertPageVisitSchema = createInsertSchema(pageVisits).pick({
  page: true,
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).pick({
  formType: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type PageVisit = typeof pageVisits.$inferSelect;

export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
