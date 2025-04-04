# AMIX Website

The official website for AMIX International Group (amix.pro), connecting global businesses with opportunities across ASEAN countries.

## Telegram Bot Integration

The website now includes integration with Telegram to collect form submissions and send them directly to a Telegram group or channel. This implementation handles three types of forms:

1. **Contact Form** - Main contact form for general inquiries
2. **Visitor Form** - Form for visitors interested in exhibitions 
3. **Participant Form** - Form for businesses that want to participate in exhibitions

### How It Works

When a user submits any of these forms, the data is:
1. Validated on the client side
2. Sent to the server API endpoint
3. Validated again on the server 
4. Formatted into a readable message
5. Sent to a specified Telegram channel/group using the Telegram Bot API

### Configuration

The Telegram integration uses the following environment variables:

- `TELEGRAM_TOKEN` - The token for your Telegram bot
- `TELEGRAM_CHAT_ID` - The ID of the chat where messages should be sent

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Deployment

The website is configured for deployment on Render.com using the `render.yaml` configuration file.

## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Render.com
- **Bot Integration**: Telegram Bot API

## Forms Implementation

All forms include:
- Client-side validation
- Server-side validation
- Real-time feedback
- Telegram notifications
