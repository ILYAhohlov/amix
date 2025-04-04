// This is a demonstration script showing how to integrate Telegram posts with the blog

const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your bot token and channel username
const token = process.env.TELEGRAM_BLOG_BOT_TOKEN;
const channelUsername = '@YourChannelName'; // Example: @AMIXBlog

// Initialize the bot
const bot = new TelegramBot(token, { polling: true });

// Path to the blog posts JSON file
const blogPostsPath = path.join(__dirname, '../client/src/data/blogPosts.json');

// Function to convert a Telegram post to a blog post
function convertTelegramToPost(message) {
  // Extract the title from the first line of the message
  const lines = message.text.split('\n');
  const title = lines[0].trim();
  
  // Extract subtitle (second line) if it exists
  const subtitle = lines.length > 1 ? lines[1].trim() : '';
  
  // Rest of the content
  const content = lines.slice(subtitle ? 2 : 1).map(line => line.trim()).filter(line => line);
  
  // Generate a slug from the title
  const slug = title.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-');   // Replace spaces with hyphens
  
  // Create a new post object
  const newPost = {
    id: slug,
    title: title,
    subtitle: subtitle || `${title} - AMIX International Group`,
    slug: slug,
    publishDate: new Date().toISOString(),
    excerpt: content[0] || title,
    content: content,
    contactEmail: "amixint@gmail.com",
    imageUrl: "/assets/default-post.jpg", // Default image
    author: "AMIX International Group",
    keywords: ["ASEAN", "Vietnam", "trade"] // Default keywords
  };
  
  return newPost;
}

// Function to add a new post to the JSON file
function addPostToJson(post) {
  try {
    // Read existing posts
    const postsData = fs.readFileSync(blogPostsPath, 'utf8');
    const posts = JSON.parse(postsData);
    
    // Add the new post at the beginning
    posts.unshift(post);
    
    // Write back to file
    fs.writeFileSync(blogPostsPath, JSON.stringify(posts, null, 2), 'utf8');
    
    return true;
  } catch (error) {
    console.error('Error adding post to JSON file:', error);
    return false;
  }
}

// Listen for channel posts
bot.on('channel_post', (msg) => {
  // Check if the message is from the target channel
  if (msg.chat.username === channelUsername.replace('@', '')) {
    // Process only text messages
    if (msg.text) {
      // Convert the Telegram post to a blog post format
      const newPost = convertTelegramToPost(msg);
      
      // Add the post to the JSON file
      const success = addPostToJson(newPost);
      
      if (success) {
        console.log(`Added new blog post: ${newPost.title}`);
      }
    }
  }
});

// Handle webhook errors
bot.on('webhook_error', (error) => {
  console.log(error.code);
});

console.log('Telegram blog integration bot is running...');

/*
SETUP INSTRUCTIONS:

1. Install the required package:
   npm install node-telegram-bot-api

2. Create a bot via @BotFather on Telegram and get the token

3. Create a channel and add the bot as an administrator with the right to post

4. Set environment variable:
   export TELEGRAM_BLOG_BOT_TOKEN=your_bot_token_here

5. Run this script:
   node telegram-blog-integration.js

USAGE:

1. Post a message to your channel in this format:
   Title
   Subtitle
   First paragraph content...
   
   Second paragraph content...
   
   Etc.

2. The script will convert this to a blog post and add it to your blogPosts.json file
*/ 