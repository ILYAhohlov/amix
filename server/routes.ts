import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { db } from "./db";
import { blogPosts } from "@shared/schema";
import { eq } from "drizzle-orm";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import {
  sendTelegramMessage,
  formatContactMessage,
  formatVisitorMessage,
  formatParticipantMessage,
  formatBusinessMissionMessage,
  formatBusinessTourMessage,
  formatITSolutionsMessage
} from "./telegram";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

function requireAdmin(req: Request, res: Response): boolean {
  const token = req.headers["x-admin-token"];
  if (token !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return false;
  }
  return true;
}

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

const businessMissionFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Country is required"),
  comments: z.string().optional(),
  exhibition: z.string().optional(),
});

const businessTourFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(5, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  comments: z.string().optional(),
  package: z.enum(['basic', 'standard', 'premium'])
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

  // Business Mission form submission endpoint
  app.post("/api/business-mission", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = businessMissionFormSchema.parse(req.body);
      
      // Send notification to Telegram
      const telegramMessage = formatBusinessMissionMessage(validatedData);
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
      
      console.error("Business Mission form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your registration. Please try again later." 
      });
    }
  });

  // Business Tour form submission endpoint
  app.post("/api/business-tour", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = businessTourFormSchema.parse(req.body);
      
      // Send notification to Telegram
      const telegramMessage = formatBusinessTourMessage(validatedData);
      await sendTelegramMessage(telegramMessage);
      
      // For demo purposes, simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.status(200).json({ 
        success: true, 
        message: "Thank you for your booking request! We will contact you soon." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Business tour form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while submitting your booking request. Please try again later." 
      });
    }
  });

  // IT Solutions form submission endpoint
  app.post("/api/it-solutions", async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        name: z.string().min(2),
        company: z.string().min(2),
        phone: z.string().min(5),
        comment: z.string().optional(),
      });
      const validatedData = schema.parse(req.body);
      const telegramMessage = formatITSolutionsMessage(validatedData);
      await sendTelegramMessage(telegramMessage);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      res.status(500).json({ success: false });
    }
  });

  // Blog CMS API
  // Public endpoint to get published posts only
  app.get("/api/posts", async (req: Request, res: Response) => {
    try {
      const posts = await db.select().from(blogPosts).where(eq(blogPosts.status, "published"));
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ success: false, message: "Failed to fetch posts" });
    }
  });

  app.get("/api/admin/posts", async (req: Request, res: Response) => {
    if (!requireAdmin(req, res)) return;
    try {
      const posts = await db.select().from(blogPosts);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ success: false, message: "Failed to fetch posts" });
    }
  });

  app.post("/api/admin/posts", async (req: Request, res: Response) => {
    if (!requireAdmin(req, res)) return;
    try {
      const post = { ...req.body, id: req.body.id || req.body.slug };
      await db.insert(blogPosts).values(post);
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ success: false, message: "Failed to create post" });
    }
  });

  app.put("/api/admin/posts/:id", async (req: Request, res: Response) => {
    if (!requireAdmin(req, res)) return;
    try {
      await db.update(blogPosts).set(req.body).where(eq(blogPosts.id, req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ success: false, message: "Failed to update post" });
    }
  });

  app.delete("/api/admin/posts/:id", async (req: Request, res: Response) => {
    if (!requireAdmin(req, res)) return;
    try {
      await db.delete(blogPosts).where(eq(blogPosts.id, req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ success: false, message: "Failed to delete post" });
    }
  });

  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, token: process.env.ADMIN_PASSWORD });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  });

  app.post("/api/admin/upload", upload.single("image"), async (req: Request, res: Response) => {
    if (!requireAdmin(req, res)) return;
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "amix-blog" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file!.buffer);
      });
      res.json({ success: true, url: (result as any).secure_url });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ success: false, message: "Failed to upload image" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
