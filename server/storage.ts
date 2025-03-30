import { 
  type User, 
  type InsertUser, 
  type WaitlistEntry, 
  type InsertWaitlistEntry, 
  type PageVisit, 
  type InsertPageVisit, 
  type FormSubmission, 
  type InsertFormSubmission 
} from "@shared/schema";
import { User as PrismaUser, WaitlistEntry as PrismaWaitlistEntry, PageVisit as PrismaPageVisit, FormSubmission as PrismaFormSubmission } from "@prisma/client";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist entries
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntry(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntries(): Promise<WaitlistEntry[]>;
  
  // Analytics
  recordPageVisit(visit: InsertPageVisit): Promise<PageVisit>;
  recordFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission>;
  getPageVisits(): Promise<PageVisit[]>;
  getFormSubmissions(): Promise<FormSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlist: Map<number, WaitlistEntry>;
  private pageVisits: Map<number, PageVisit>;
  private formSubmissions: Map<number, FormSubmission>;
  
  currentId: { 
    users: number;
    waitlist: number;
    pageVisits: number;
    formSubmissions: number;
  };

  constructor() {
    this.users = new Map();
    this.waitlist = new Map();
    this.pageVisits = new Map();
    this.formSubmissions = new Map();
    
    this.currentId = {
      users: 1,
      waitlist: 1,
      pageVisits: 1,
      formSubmissions: 1
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const user: User = { ...insertUser, id, createdAt, updatedAt };
    this.users.set(id, user);
    return user;
  }
  
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    // Check if email already exists
    const existing = await this.getWaitlistEntry(entry.email);
    if (existing) {
      throw new Error("Email already registered on waitlist");
    }
    
    const id = this.currentId.waitlist++;
    const createdAt = new Date();
    const waitlistEntry = { 
      id, 
      name: entry.name,
      email: entry.email,
      phone: entry.phone || null,
      company: entry.company || null,
      message: entry.message || null,
      acceptsUpdates: entry.acceptsUpdates || 0,
      createdAt 
    } as WaitlistEntry;
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }
  
  async getWaitlistEntry(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlist.values()).find(
      (entry) => entry.email === email
    );
  }
  
  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    return Array.from(this.waitlist.values());
  }
  
  async recordPageVisit(visit: InsertPageVisit): Promise<PageVisit> {
    const id = this.currentId.pageVisits++;
    const timestamp = new Date();
    const pageVisit: PageVisit = { ...visit, id, timestamp };
    this.pageVisits.set(id, pageVisit);
    return pageVisit;
  }
  
  async recordFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const id = this.currentId.formSubmissions++;
    const timestamp = new Date();
    const formSubmission: FormSubmission = { ...submission, id, timestamp };
    this.formSubmissions.set(id, formSubmission);
    return formSubmission;
  }
  
  async getPageVisits(): Promise<PageVisit[]> {
    return Array.from(this.pageVisits.values());
  }
  
  async getFormSubmissions(): Promise<FormSubmission[]> {
    return Array.from(this.formSubmissions.values());
  }
}

import { prisma } from './prisma';

export class PrismaStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await prisma.user.findUnique({
      where: { id }
    });
    return result as User | undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await prisma.user.findUnique({
      where: { username }
    });
    return result as User | undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await prisma.user.create({
      data: user
    });
    return result as User;
  }
  
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    // Check if email already exists
    const existing = await this.getWaitlistEntry(entry.email);
    if (existing) {
      throw new Error("Email already registered on waitlist");
    }
    
    const result = await prisma.waitlistEntry.create({
      data: {
        name: entry.name,
        email: entry.email,
        phone: entry.phone || null,
        company: entry.company || null,
        message: entry.message || null,
        acceptsUpdates: entry.acceptsUpdates || 0
      }
    });
    
    return result as WaitlistEntry;
  }
  
  async getWaitlistEntry(email: string): Promise<WaitlistEntry | undefined> {
    const result = await prisma.waitlistEntry.findUnique({
      where: { email }
    });
    return result as WaitlistEntry | undefined;
  }
  
  async getWaitlistEntries(): Promise<WaitlistEntry[]> {
    const result = await prisma.waitlistEntry.findMany();
    return result as WaitlistEntry[];
  }
  
  async recordPageVisit(visit: InsertPageVisit): Promise<PageVisit> {
    const result = await prisma.pageVisit.create({
      data: visit
    });
    return result as PageVisit;
  }
  
  async recordFormSubmission(submission: InsertFormSubmission): Promise<FormSubmission> {
    const result = await prisma.formSubmission.create({
      data: submission
    });
    return result as FormSubmission;
  }
  
  async getPageVisits(): Promise<PageVisit[]> {
    const result = await prisma.pageVisit.findMany();
    return result as PageVisit[];
  }
  
  async getFormSubmissions(): Promise<FormSubmission[]> {
    const result = await prisma.formSubmission.findMany();
    return result as FormSubmission[];
  }
}

// Choose which storage implementation to use
export const storage = process.env.MYSQL_DATABASE_URL 
  ? new PrismaStorage() 
  : new MemStorage();
