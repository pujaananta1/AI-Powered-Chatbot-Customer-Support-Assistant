# AI-Powered Customer Support Chatbot
[🌐 **Live Demo on Render**](https://ai-powered-chatbot-customer-support.onrender.com)

A modern, intelligent customer support chatbot with an admin dashboard built using React, Express.js, and TypeScript. This application provides automated responses to user queries using rule-based AI logic, designed to reduce support costs and provide 24/7 assistance.


## ✨ Features

### 🎯 Core Features
- **Interactive Chat Interface** - Real-time conversations with professional UI
- **Rule-Based AI Responses** - Intelligent FAQ matching with keyword detection
- **Admin Dashboard** - Comprehensive management interface
- **FAQ Management System** - Create, edit, and organize frequently asked questions
- **Conversation Tracking** - Monitor and manage customer interactions
- **Real-time Statistics** - Track active chats, resolution rates, and performance metrics

### 🎨 Design & UX
- **Professional Design** - Inspired by Intercom and Zendesk interfaces
- **Responsive Layout** - Works seamlessly on desktop and mobile
- **Dark Mode Support** - Complete theme switching capability
- **Smooth Animations** - Floating chat widget with typing indicators
- **Modern UI Components** - Built with Radix UI and Tailwind CSS

### 🔧 Technical Features
- **TypeScript** - Full type safety across frontend and backend
- **Real-time Chat** - Instant message delivery and responses
- **In-Memory Storage** - Fast development setup (easily switchable to database)
- **RESTful API** - Clean backend architecture
- **Form Validation** - Zod-powered validation with React Hook Form

## 🚀 Live Demo

The application features:
- **Admin Dashboard** with statistics and FAQ management
- **Interactive Chat Widget** accessible from any page
- **Quick Reply Options** for common customer queries
- **Conversation History** with status tracking

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **TanStack Query** - Server state management
- **React Hook Form** - Performant form handling
- **Wouter** - Lightweight routing

### Backend
- **Node.js** with Express.js
- **TypeScript** - Type-safe server development
- **Zod** - Runtime validation and type inference
- **Drizzle ORM** - Type-safe database operations

### Development Tools
- **ESLint & Prettier** - Code quality and formatting
- **Vite HMR** - Hot module replacement for fast development

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-support-chatbot.git
   cd ai-support-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

The application will start with both frontend and backend running on the same port.

## 🎯 Usage

### Admin Dashboard
1. **View Statistics** - Monitor active chats, resolution rates, and performance
2. **Manage FAQs** - Add, edit, or delete frequently asked questions
3. **Track Conversations** - View recent customer interactions and their status

### Chat Widget
1. **Customer Interface** - Click the floating chat button to start a conversation
2. **Quick Replies** - Use predefined options for common queries
3. **Smart Responses** - Get instant answers based on FAQ matching and keywords

### FAQ Management
1. **Add New FAQs** - Create questions with answers, categories, and keywords
2. **Edit Existing** - Update content and improve responses
3. **Track Usage** - Monitor which FAQs are most helpful to customers

## 🏗️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── services/       # API service layer
├── server/                 # Backend Express application
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Data storage interface
│   └── index.ts            # Server entry point
├── shared/                 # Shared TypeScript types
│   └── schema.ts           # Database schema and types
└── package.json            # Project dependencies
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
```

### Customization
- **Colors**: Modify CSS variables in `client/src/index.css`
- **FAQ Categories**: Update the category list in the FAQ management component
- **AI Responses**: Customize rule-based logic in `server/routes.ts`

## 🎨 Design System

### Color Palette
- **Primary**: `#0084FF` (Messenger Blue)
- **Secondary**: `#F0F2F5` (Light Grey)
- **Accent**: `#42B883` (Success Green)
- **AI Bubble**: `#E4E6EA` (Light Bubble Grey)
- **Background**: `#FFFFFF` (White)
- **Text**: `#1C1E21` (Dark Grey)

### Typography
- **Font Family**: Inter (Primary), SF Pro Display (Fallback)
- **Design**: Clean, professional support aesthetic

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Platform Deployment
The application is configured for easy deployment on:
- **Render** - Ready to deploy with existing configuration


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Contact the development team

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Integration with popular CRM systems
- [ ] Advanced AI response training
- [ ] File upload support in chat
- [ ] Voice message capabilities

##This project demonstrates modern full-stack development practices with TypeScript, React, and Express.js, focusing on user experience and maintainable code architecture.*
