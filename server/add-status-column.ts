import { config } from "dotenv";
config();

import { db } from "./db";
import { blogPosts } from "@shared/schema";
import { sql } from "drizzle-orm";

async function addStatusColumn() {
  try {
    console.log("🔄 Adding status column to existing posts...");
    
    // Add status column if it doesn't exist
    await db.execute(sql`
      ALTER TABLE blog_posts 
      ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published'
    `);
    
    console.log("✅ Status column added successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

addStatusColumn();
