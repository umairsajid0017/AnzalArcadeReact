import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema, insertPageVisitSchema, insertFormSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  const apiRouter = app.route('/api');
  
  // Waitlist entry submission
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
      
      // Create waitlist entry
      const entry = await storage.createWaitlistEntry(result.data);
      
      // Record form submission for analytics
      await storage.recordFormSubmission({ formType: 'waitlist' });
      
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
  
  // Record page visit for analytics
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
      
      await storage.recordPageVisit(result.data);
      
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
  
  // Analytics endpoints (for an admin dashboard that could be built later)
  app.get('/api/analytics/pageVisits', async (req, res) => {
    try {
      const visits = await storage.getPageVisits();
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
      const submissions = await storage.getFormSubmissions();
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
