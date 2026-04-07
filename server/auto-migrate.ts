import { config } from "dotenv";
config();

import { db } from "./db";
import { blogPosts } from "@shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { count } from "drizzle-orm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_POSTS_PATH = path.resolve(__dirname, "../client/src/data/blogPosts.json");

export async function autoMigratePosts() {
  try {
    // Check if posts already exist
    const result = await db.select({ count: count() }).from(blogPosts);
    const postsCount = result[0]?.count || 0;
    
    if (postsCount > 0) {
      console.log(`✅ Database already has ${postsCount} posts, skipping migration`);
      return;
    }
    
    console.log("🔄 Starting automatic migration...");
    
    const postsData = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, "utf-8"));
    console.log(`📝 Found ${postsData.length} posts to migrate`);
    
    for (const post of postsData) {
      await db.insert(blogPosts).values(post);
      console.log(`✅ Migrated: ${post.title}`);
    }
    
    console.log("🎉 Automatic migration completed successfully!");
  } catch (error) {
    console.error("❌ Automatic migration failed:", error);
    // Don't throw - let the server start anyway
  }
}
