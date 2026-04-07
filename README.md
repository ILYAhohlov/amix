# AMIX Website

The official website for AMIX International Group (amix.pro), connecting global businesses with opportunities across ASEAN countries.

## Blog CMS

The website includes a built-in Content Management System for blog posts.

### Features

- **Admin Panel** - Secure admin interface at `/admin/blog`
- **CRUD Operations** - Create, read, update, and delete blog posts
- **Rich Content** - Support for multiple paragraphs, images, and metadata
- **SEO Optimized** - Automatic meta tags, Open Graph, and Schema.org markup
- **Dynamic Routing** - Posts accessible via `/blog/:slug`

### Admin Access

1. Navigate to `https://amix.pro/admin/blog`
2. Enter the admin password (set via `ADMIN_PASSWORD` environment variable)
3. Create, edit, or delete blog posts

### Post Structure

Each blog post includes:
- **Title** - Main heading
- **Subtitle** - Secondary heading
- **Slug** - URL-friendly identifier
- **Publish Date** - Publication timestamp
- **Excerpt** - Short summary for listings
- **Content** - Array of paragraphs (supports HTML)
- **Contact Email** - Optional email for inquiries
- **Image URL** - Featured image path
- **Author** - Post author name
- **Keywords** - SEO keywords array

## Telegram Bot Integration

The website now includes integration with Telegram to collect form submissions and send them directly to a Telegram group or channel. This implementation handles multiple types of forms:

1. **Contact Form** - Main contact form for general inquiries
2. **Visitor Form** - Form for visitors interested in exhibitions 
3. **Participant Form** - Form for businesses that want to participate in exhibitions
4. **Business Tour Form** - Registration for business tours
5. **IT Solutions Form** - Inquiries for IT solutions

### How It Works

When a user submits any of these forms, the data is:
1. Validated on the client side
2. Sent to the server API endpoint
3. Validated again on the server 
4. Formatted into a readable message
5. Sent to a specified Telegram channel/group using the Telegram Bot API

### Configuration

The following environment variables are required:

- `TELEGRAM_BOT_TOKEN` - The token for your Telegram bot
- `TELEGRAM_CHAT_ID` - The ID of the chat where messages should be sent
- `ADMIN_PASSWORD` - Password for blog admin panel access

### Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your values
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

### Deployment

The website is configured for deployment on Render.com using the `render.yaml` configuration file.

**Important**: Set the `ADMIN_PASSWORD` environment variable in Render dashboard:
1. Go to your service in Render
2. Navigate to Environment tab
3. Add `ADMIN_PASSWORD` with a secure password

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Render.com
- **Bot Integration**: Telegram Bot API
- **Blog Storage**: JSON file-based (blogPosts.json)

## Forms Implementation

All forms include:
- Client-side validation
- Server-side validation
- Real-time feedback
- Telegram notifications
