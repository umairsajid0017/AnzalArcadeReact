import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Construction company projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Residential, Commercial, Industrial, etc.
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  completionDate: text("completion_date"),
  clientName: text("client_name"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Construction company services
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  iconName: text("icon_name").notNull(), // For rendering the appropriate icon
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Company information (like about us, mission, vision, etc.)
export const companyInfo = pgTable("company_info", {
  id: serial("id").primaryKey(), 
  section: text("section").notNull().unique(), // about, mission, vision, etc.
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contact messages from users
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, read, replied, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  category: true,
  location: true,
  imageUrl: true,
  completionDate: true,
  clientName: true,
  featured: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  iconName: true,
  featured: true,
});

export const insertCompanyInfoSchema = createInsertSchema(companyInfo).pick({
  section: true,
  content: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
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

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertCompanyInfo = z.infer<typeof insertCompanyInfoSchema>;
export type CompanyInfo = typeof companyInfo.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;

export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type PageVisit = typeof pageVisits.$inferSelect;

export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
