import { config } from "dotenv";
config();

import { db } from "./db";
import { blogPosts } from "@shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_POSTS_PATH = path.resolve(__dirname, "../client/src/data/blogPosts.json");

async function migratePosts() {
  try {
    console.log("🔄 Starting migration...");
    
    const postsData = JSON.parse(fs.readFileSync(BLOG_POSTS_PATH, "utf-8"));
    console.log(`📝 Found ${postsData.length} posts to migrate`);
    
    for (const post of postsData) {
      await db.insert(blogPosts).values(post);
      console.log(`✅ Migrated: ${post.title}`);
    }
    
    console.log("🎉 Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migratePosts();
