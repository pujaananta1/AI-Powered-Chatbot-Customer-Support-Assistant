import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFaqSchema, insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // FAQ Routes
  app.get("/api/faqs", async (_req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  app.post("/api/faqs", async (req, res) => {
    try {
      const faqData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(faqData);
      res.json(faq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid FAQ data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create FAQ" });
      }
    }
  });

  app.put("/api/faqs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertFaqSchema.partial().parse(req.body);
      const faq = await storage.updateFaq(id, updateData);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid FAQ data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update FAQ" });
      }
    }
  });

  app.delete("/api/faqs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteFaq(id);
      if (!deleted) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      res.json({ message: "FAQ deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete FAQ" });
    }
  });

  // Chat Routes
  app.post("/api/chat/message", async (req, res) => {
    try {
      const schema = z.object({
        content: z.string().min(1),
        conversationId: z.string().optional(),
        userName: z.string().default("Anonymous")
      });
      
      const { content, conversationId, userName } = schema.parse(req.body);
      
      let conversation;
      if (conversationId) {
        conversation = await storage.getConversation(conversationId);
      }
      
      if (!conversation) {
        conversation = await storage.createConversation({ user_name: userName });
      }

      // Create user message
      const userMessage = await storage.createMessage({
        conversation_id: conversation.id,
        content,
        is_user: 1
      });

      // Generate AI response
      const aiResponse = await generateAIResponse(content);
      const aiMessage = await storage.createMessage({
        conversation_id: conversation.id,
        content: aiResponse,
        is_user: 0
      });

      res.json({
        conversationId: conversation.id,
        userMessage,
        aiMessage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to process message" });
      }
    }
  });

  app.get("/api/conversations", async (_req, res) => {
    try {
      const conversations = await storage.getConversations();
      
      // Add last message to each conversation
      const conversationsWithMessages = await Promise.all(
        conversations.map(async (conv) => {
          const messages = await storage.getMessages(conv.id);
          const lastMessage = messages[messages.length - 1];
          return {
            ...conv,
            lastMessage: lastMessage ? lastMessage.content : "No messages yet",
            messageCount: messages.length
          };
        })
      );
      
      res.json(conversationsWithMessages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  app.get("/api/conversations/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const messages = await storage.getMessages(id);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Rule-based AI response generator
async function generateAIResponse(userMessage: string): Promise<string> {
  const lowerMessage = userMessage.toLowerCase();
  
  // Search for matching FAQs first
  const matchingFaqs = await storage.searchFaqs(userMessage);
  if (matchingFaqs.length > 0) {
    const bestMatch = matchingFaqs[0];
    await storage.incrementFaqUsage(bestMatch.id);
    return bestMatch.answer;
  }
  
  // Rule-based responses for common patterns
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm here to help you with any questions you might have. What can I assist you with today?";
  }
  
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're welcome! Is there anything else I can help you with?";
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return "Goodbye! Feel free to come back if you need any assistance. Have a great day!";
  }
  
  if (lowerMessage.includes('account') || lowerMessage.includes('login')) {
    return "I can help you with account-related questions. Are you having trouble logging in, or do you need help with account settings?";
  }
  
  if (lowerMessage.includes('order') || lowerMessage.includes('track') || lowerMessage.includes('shipping')) {
    return "For order-related inquiries, I can help you track your order or answer questions about shipping. Do you have an order number I can look up?";
  }
  
  if (lowerMessage.includes('bill') || lowerMessage.includes('payment') || lowerMessage.includes('subscription')) {
    return "I can assist with billing and payment questions. Are you looking to update payment information, view your bill, or manage your subscription?";
  }
  
  if (lowerMessage.includes('cancel') || lowerMessage.includes('refund')) {
    return "I understand you're looking for help with cancellation or refunds. Let me connect you with the right information to assist you with this process.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to help! You can ask me about account issues, orders, billing, or general questions. What specific topic would you like assistance with?";
  }
  
  // Default response for unmatched queries
  return "Thank you for your message. I'd be happy to help you with that. Could you provide more details about your specific question or concern? You can also try asking about common topics like account help, order tracking, or billing questions.";
}
