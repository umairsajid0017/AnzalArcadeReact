import { 
  users, 
  waitlistEntries, 
  pageVisits, 
  formSubmissions, 
  type User, 
  type InsertUser, 
  type WaitlistEntry, 
  type InsertWaitlistEntry, 
  type PageVisit, 
  type InsertPageVisit, 
  type FormSubmission, 
  type InsertFormSubmission 
} from "@shared/schema";

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
    const user: User = { ...insertUser, id };
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
    const waitlistEntry: WaitlistEntry = { ...entry, id, createdAt };
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

export const storage = new MemStorage();
