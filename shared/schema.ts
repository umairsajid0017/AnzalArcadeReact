import { z } from "zod";
import { User as PrismaUser, Project as PrismaProject, Service as PrismaService, 
         CompanyInfo as PrismaCompanyInfo, ContactMessage as PrismaContactMessage,
         WaitlistEntry as PrismaWaitlistEntry, PageVisit as PrismaPageVisit,
         FormSubmission as PrismaFormSubmission } from "@prisma/client";

// Zod schemas for insertions
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  completionDate: z.string().optional(),
  clientName: z.string().optional(),
  featured: z.boolean().default(false),
});

export const insertServiceSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconName: z.string(),
  featured: z.boolean().default(false),
});

export const insertCompanyInfoSchema = z.object({
  section: z.string(),
  content: z.string(),
});

export const insertContactMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string(),
});

export const insertWaitlistEntrySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  acceptsUpdates: z.number().optional().default(1),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
});

export const insertPageVisitSchema = z.object({
  page: z.string(),
});

export const insertFormSubmissionSchema = z.object({
  formType: z.string(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = PrismaUser;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = PrismaProject;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = PrismaService;

export type InsertCompanyInfo = z.infer<typeof insertCompanyInfoSchema>;
export type CompanyInfo = PrismaCompanyInfo;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = PrismaContactMessage;

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = PrismaWaitlistEntry;

export type InsertPageVisit = z.infer<typeof insertPageVisitSchema>;
export type PageVisit = PrismaPageVisit;

export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = PrismaFormSubmission;
