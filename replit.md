# AI Support Dashboard

## Overview

This project is a full-stack AI-powered customer support dashboard built with React, Express.js, and PostgreSQL. The application provides automated FAQ responses, conversation management, and real-time chat capabilities. It features a modern admin dashboard for managing FAQs and monitoring support interactions, with an embedded chat widget for customer engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod for runtime type checking and API validation
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage
- **Primary Database**: PostgreSQL with UUID primary keys
- **Connection**: Neon serverless PostgreSQL via @neondatabase/serverless
- **Schema Management**: Drizzle migrations with schema-first approach
- **Development Storage**: In-memory storage implementation for development/testing

### Database Schema Design
- **Users**: Basic authentication with username/password
- **FAQs**: Categorized knowledge base with keyword arrays and usage tracking
- **Conversations**: Chat sessions with status tracking (active, resolved, pending)
- **Messages**: Chat messages linked to conversations with user/AI distinction

### Authentication & Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Security**: Environment-based configuration with secure session handling

### Development Environment
- **Package Manager**: npm with lockfile versioning
- **Development Server**: Hot module replacement via Vite
- **Error Overlay**: Replit-specific runtime error modal for development
- **Code Analysis**: Replit Cartographer integration for development insights

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe PostgreSQL ORM
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **wouter**: Lightweight React router

### UI Component Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives (20+ components)
- **lucide-react**: Icon library for consistent iconography
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **embla-carousel-react**: Carousel component implementation

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Code analysis and insights

### Form Handling & Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation library
- **drizzle-zod**: Drizzle ORM integration with Zod

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **cmdk**: Command palette component
- **nanoid**: Unique ID generation

### Database & Session Management
- **connect-pg-simple**: PostgreSQL session store for Express
- **drizzle-kit**: Database migration and schema management tools