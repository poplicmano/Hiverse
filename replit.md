# Hiverse Discord Community Website

## Overview

Hiverse is a Discord community website featuring a dark, multiverse-themed aesthetic. The platform showcases the community's founders, ongoing giveaways, and features while providing an admin panel for managing giveaway content. Built with React, Express, and TypeScript, the site emphasizes visual appeal with particle effects, smooth animations, and a professional gaming aesthetic inspired by Discord and Riot Games.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript using Vite as the build tool
- Single-page application (SPA) using Wouter for client-side routing
- Component library based on shadcn/ui (Radix UI primitives with Tailwind CSS)
- TanStack Query (React Query) for server state management

**UI Design System**
- Dark theme with gaming/multiverse aesthetic using dark blue, blue, and black color palette
- Tailwind CSS with custom configuration for consistent spacing (4, 6, 8, 12, 16 units)
- Google Fonts (Inter and Poppins) for typography
- Custom particle background effects and smooth animations
- Responsive design with mobile-first approach

**Component Structure**
- Modular section-based components: Hero, About, Giveaways, Features, Footer
- Reusable UI components from shadcn/ui library
- Custom components: ParticleBackground, DiscordPopup (appears every 10 minutes)
- Admin panel with password protection (password: "Hiverse2025")

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- ESM module system throughout the application
- Development server with Vite middleware integration
- Custom logging middleware for API request tracking

**Data Storage**
- In-memory storage implementation (MemStorage class) for development
- Database schema designed for PostgreSQL using Drizzle ORM
- Giveaway entity with fields: id, title, description, imageUrl, endDate, isActive, createdAt
- Seed data provided for initial giveaways

**API Design**
- RESTful endpoints for giveaway management:
  - GET /api/giveaways - Retrieve all giveaways
  - POST /api/giveaways - Create new giveaway (admin only)
  - POST /api/giveaways/:id/end - End active giveaway (admin only)
- POST /api/admin/verify - Admin authentication endpoint
- Form validation using Zod schemas with type safety

**Authentication**
- Simple password-based admin authentication
- Hardcoded admin password: "Hiverse2025"
- No session management or JWT implementation

### External Dependencies

**Third-Party Services**
- Discord Integration: Webhook notifications sent when giveaways are created or ended
  - Webhook URL configured via DISCORD_WEBHOOK_URL environment variable
  - Rich embeds with title, description, image, and color coding
- Discord Community Link: https://discord.gg/JQ9RyTvE8w

**Database**
- Designed for Neon PostgreSQL (serverless PostgreSQL)
- Connection via DATABASE_URL environment variable
- Drizzle ORM for type-safe database queries
- Migration system configured but not currently active (using in-memory storage)

**UI Component Libraries**
- Radix UI primitives (20+ component packages for accessible UI patterns)
- React Hook Form with Zod resolver for form management
- Embla Carousel for potential carousel implementations
- Lucide React for icons
- React Icons (specifically SiDiscord for Discord branding)

**Development Tools**
- Replit-specific plugins for development environment
- TypeScript for type safety across the entire stack
- ESBuild for production builds
- PostCSS with Tailwind CSS and Autoprefixer

**Frontend State Management**
- TanStack Query for API data fetching and caching
- Query invalidation on mutations (creating/ending giveaways)
- Toast notifications for user feedback using Radix UI Toast