import type { Express } from "express";
import { createServer, type Server } from "http";
import { prisma } from "./prisma";
import { storage } from "./storage";
import { 
  insertWaitlistEntrySchema, 
  insertPageVisitSchema, 
  insertFormSubmissionSchema,
  insertProjectSchema,
  insertServiceSchema,
  insertContactMessageSchema,
  insertCompanyInfoSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  
  // Project routes
  // Get all projects
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json({ 
        success: true,
        data: projects
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Get featured projects
  app.get('/api/projects/featured', async (req, res) => {
    try {
      const projects = await prisma.project.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json({ 
        success: true,
        data: projects
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Get a single project by ID
  app.get('/api/projects/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const project = await prisma.project.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!project) {
        return res.status(404).json({ 
          success: false,
          message: 'Project not found'
        });
      }
      
      return res.status(200).json({ 
        success: true,
        data: project
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Create a new project
  app.post('/api/projects', async (req, res) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false,
          message: validationError.message 
        });
      }
      
      const project = await prisma.project.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          category: result.data.category,
          location: result.data.location,
          imageUrl: result.data.imageUrl,
          completionDate: result.data.completionDate || undefined,
          clientName: result.data.clientName || undefined,
          featured: Boolean(result.data.featured)
        }
      });
      
      return res.status(201).json({ 
        success: true,
        data: project
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Service routes
  // Get all services
  app.get('/api/services', async (req, res) => {
    try {
      const services = await prisma.service.findMany({
        orderBy: { title: 'asc' }
      });
      return res.status(200).json({ 
        success: true,
        data: services
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Get featured services
  app.get('/api/services/featured', async (req, res) => {
    try {
      const services = await prisma.service.findMany({
        where: { featured: true },
        orderBy: { title: 'asc' }
      });
      return res.status(200).json({ 
        success: true,
        data: services
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Get a single service by ID
  app.get('/api/services/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const service = await prisma.service.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!service) {
        return res.status(404).json({ 
          success: false,
          message: 'Service not found'
        });
      }
      
      return res.status(200).json({ 
        success: true,
        data: service
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Create a new service
  app.post('/api/services', async (req, res) => {
    try {
      const result = insertServiceSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false,
          message: validationError.message 
        });
      }
      
      const service = await prisma.service.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          iconName: result.data.iconName,
          featured: Boolean(result.data.featured)
        }
      });
      
      return res.status(201).json({ 
        success: true,
        data: service
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Contact Message routes
  // Submit a contact message
  app.post('/api/contact', async (req, res) => {
    try {
      const result = insertContactMessageSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false,
          message: validationError.message 
        });
      }
      
      const message = await prisma.contactMessage.create({
        data: result.data
      });
      
      // Record form submission for analytics
      await prisma.formSubmission.create({
        data: { formType: 'contact' }
      });
      
      return res.status(201).json({ 
        success: true,
        message: 'Your message has been sent successfully!',
        data: {
          id: message.id
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Company Info routes
  // Get company info by section
  app.get('/api/company-info/:section', async (req, res) => {
    try {
      const { section } = req.params;
      const info = await prisma.companyInfo.findUnique({
        where: { section }
      });
      
      if (!info) {
        return res.status(404).json({ 
          success: false,
          message: 'Company information not found'
        });
      }
      
      return res.status(200).json({ 
        success: true,
        data: info
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Get all company info sections
  app.get('/api/company-info', async (req, res) => {
    try {
      const info = await prisma.companyInfo.findMany();
      return res.status(200).json({ 
        success: true,
        data: info
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });

  // Waitlist entry submission - updated to use Prisma
  app.post('/api/waitlist', async (req, res) => {
    try {
      // Validate request body
      const result = insertWaitlistEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false,
          message: validationError.message 
        });
      }
      
      // Create waitlist entry in database (using storage interface)
      const entry = await storage.createWaitlistEntry(result.data);
      
      // Record form submission for analytics
      await prisma.formSubmission.create({
        data: { formType: 'waitlist' }
      });
      
      return res.status(201).json({ 
        success: true, 
        message: 'Successfully joined the waitlist',
        data: {
          id: entry.id,
          name: entry.name,
          email: entry.email
        }
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return res.status(500).json({ 
        success: false,
        message: errorMessage
      });
    }
  });
  
  // Record page visit for analytics - updated to use Prisma
  app.post('/api/analytics/pageView', async (req, res) => {
    try {
      const result = insertPageVisitSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          success: false,
          message: validationError.message 
        });
      }
      
      await prisma.pageVisit.create({
        data: result.data
      });
      
      return res.status(201).json({ 
        success: true
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: 'Failed to record page visit'
      });
    }
  });
  
  // Analytics endpoints - updated to use Prisma
  app.get('/api/analytics/pageVisits', async (req, res) => {
    try {
      const visits = await prisma.pageVisit.findMany({
        orderBy: { timestamp: 'desc' }
      });
      return res.status(200).json({ 
        success: true,
        data: visits
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: 'Failed to retrieve page visits'
      });
    }
  });
  
  app.get('/api/analytics/formSubmissions', async (req, res) => {
    try {
      const submissions = await prisma.formSubmission.findMany({
        orderBy: { timestamp: 'desc' }
      });
      return res.status(200).json({ 
        success: true,
        data: submissions
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false,
        message: 'Failed to retrieve form submissions'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
