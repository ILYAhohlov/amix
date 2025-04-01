import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  sendTelegramMessage,
  formatContactMessage,
  formatVisitorMessage,
  formatParticipantMessage
} from "./telegram";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const visitorFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Country is required"),
  purpose: z.string().min(1, "Purpose is required"),
  comments: z.string().optional(),
  exhibition: z.string().optional(),
});

const participantFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  country: z.string().min(1, "Country is required"),
  participationType: z.string().min(1, "Participation type is required"),
  industry: z.string().min(1, "Industry is required"),
  registrationAssistance: z.string().min(1, "Registration assistance selection is required"),
  logistics: z.string().min(1, "Logistics selection is required"),
  comments: z.string().optional(),
  exhibition: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Send notification to Telegram
      const telegramMessage = formatContactMessage(validatedData);
      await sendTelegramMessage(telegramMessage);
      
      // For demo purposes, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(200).json({ 
        success: true, 
        message: "Your message has been received. We'll contact you shortly." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your message. Please try again later." 
      });
    }
  });

  // Visitor form submission endpoint
  app.post("/api/visitor", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = visitorFormSchema.parse(req.body);
      
      // Send notification to Telegram
      const telegramMessage = formatVisitorMessage(validatedData);
      await sendTelegramMessage(telegramMessage);
      
      // For demo purposes, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your interest! Your registration has been received." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Visitor form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your registration. Please try again later." 
      });
    }
  });
  
  // Participant form submission endpoint
  app.post("/api/participant", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = participantFormSchema.parse(req.body);
      
      // Send notification to Telegram
      const telegramMessage = formatParticipantMessage(validatedData);
      await sendTelegramMessage(telegramMessage);
      
      // For demo purposes, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your interest! Your participation request has been received." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Participant form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your participation request. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
