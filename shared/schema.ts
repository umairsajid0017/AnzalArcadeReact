import { mysqlTable, varchar, int, tinyint, datetime, text, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

// Construction company projects
export const projects = mysqlTable("projects", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(), // Residential, Commercial, Industrial, etc.
  location: varchar("location", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  completionDate: varchar("completion_date", { length: 100 }),
  clientName: varchar("client_name", { length: 255 }),
  featured: tinyint("featured", { unsigned: true }).default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Construction company services
export const services = mysqlTable("services", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  iconName: varchar("icon_name", { length: 100 }).notNull(), // For rendering the appropriate icon
  featured: tinyint("featured", { unsigned: true }).default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Company information (like about us, mission, vision, etc.)
export const companyInfo = mysqlTable("company_info", {
  id: int("id").primaryKey().autoincrement(), 
  section: varchar("section", { length: 100 }).notNull().unique(), // about, mission, vision, etc.
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contact messages from users
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"), // new, read, replied, etc.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const waitlistEntries = mysqlTable("waitlist_entries", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  acceptsUpdates: tinyint("accepts_updates", { unsigned: true }).notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageVisits = mysqlTable("page_visits", {
  id: int("id").primaryKey().autoincrement(),
  page: varchar("page", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const formSubmissions = mysqlTable("form_submissions", {
  id: int("id").primaryKey().autoincrement(),
  formType: varchar("form_type", { length: 100 }).notNull(),
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
