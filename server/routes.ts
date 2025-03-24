import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real app, you would send an email or store the contact submission
      // For this demo, we'll just log it and return success
      console.log("Contact form submission:", validatedData);
      
      // Simulate a delay to show loading state on the client
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

  const httpServer = createServer(app);
  return httpServer;
}
