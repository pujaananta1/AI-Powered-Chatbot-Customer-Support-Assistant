import { type User, type InsertUser, type Faq, type InsertFaq, type Conversation, type InsertConversation, type Message, type InsertMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // FAQ methods
  getFaqs(): Promise<Faq[]>;
  getFaq(id: string): Promise<Faq | undefined>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq | undefined>;
  deleteFaq(id: string): Promise<boolean>;
  searchFaqs(query: string): Promise<Faq[]>;
  incrementFaqUsage(id: string): Promise<void>;
  
  // Conversation methods
  getConversations(): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversationStatus(id: string, status: string): Promise<void>;
  
  // Message methods
  getMessages(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Stats
  getStats(): Promise<{
    activeChats: number;
    resolvedToday: number;
    responseTime: string;
    satisfaction: string;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private faqs: Map<string, Faq>;
  private conversations: Map<string, Conversation>;
  private messages: Map<string, Message>;

  constructor() {
    this.users = new Map();
    this.faqs = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    
    // Initialize with some default FAQs
    this.initializeDefaultFaqs();
  }

  private initializeDefaultFaqs() {
    const defaultFaqs = [
      {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.",
        category: "Account",
        keywords: ["password", "reset", "login", "forgot", "account"]
      },
      {
        question: "What are your business hours?",
        answer: "Our customer support is available 24/7 through this AI chatbot. For human assistance, our team is available Monday-Friday 9 AM to 6 PM EST.",
        category: "General",
        keywords: ["hours", "support", "time", "available", "contact"]
      },
      {
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and visiting the 'Order History' section, or by using the tracking number sent to your email.",
        category: "Orders",
        keywords: ["track", "order", "shipping", "delivery", "status"]
      }
    ];

    defaultFaqs.forEach(faq => {
      const id = randomUUID();
      this.faqs.set(id, {
        id,
        ...faq,
        usage_count: Math.floor(Math.random() * 200) + 10,
        created_at: new Date(),
        updated_at: new Date()
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFaqs(): Promise<Faq[]> {
    return Array.from(this.faqs.values()).sort((a, b) => b.usage_count - a.usage_count);
  }

  async getFaq(id: string): Promise<Faq | undefined> {
    return this.faqs.get(id);
  }

  async createFaq(insertFaq: InsertFaq): Promise<Faq> {
    const id = randomUUID();
    const faq: Faq = {
      id,
      ...insertFaq,
      keywords: insertFaq.keywords || [],
      usage_count: 0,
      created_at: new Date(),
      updated_at: new Date()
    };
    this.faqs.set(id, faq);
    return faq;
  }

  async updateFaq(id: string, updateData: Partial<InsertFaq>): Promise<Faq | undefined> {
    const existingFaq = this.faqs.get(id);
    if (!existingFaq) return undefined;

    const updatedFaq: Faq = {
      ...existingFaq,
      ...updateData,
      updated_at: new Date()
    };
    this.faqs.set(id, updatedFaq);
    return updatedFaq;
  }

  async deleteFaq(id: string): Promise<boolean> {
    return this.faqs.delete(id);
  }

  async searchFaqs(query: string): Promise<Faq[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.faqs.values()).filter(faq =>
      faq.question.toLowerCase().includes(lowerQuery) ||
      faq.answer.toLowerCase().includes(lowerQuery) ||
      faq.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  }

  async incrementFaqUsage(id: string): Promise<void> {
    const faq = this.faqs.get(id);
    if (faq) {
      faq.usage_count += 1;
      this.faqs.set(id, faq);
    }
  }

  async getConversations(): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .sort((a, b) => b.updated_at.getTime() - a.updated_at.getTime())
      .slice(0, 10);
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      id,
      ...insertConversation,
      status: "active",
      created_at: new Date(),
      updated_at: new Date()
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversationStatus(id: string, status: string): Promise<void> {
    const conversation = this.conversations.get(id);
    if (conversation) {
      conversation.status = status;
      conversation.updated_at = new Date();
      this.conversations.set(id, conversation);
    }
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.conversation_id === conversationId)
      .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      id,
      ...insertMessage,
      is_user: insertMessage.is_user ?? 1,
      created_at: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async getStats(): Promise<{
    activeChats: number;
    resolvedToday: number;
    responseTime: string;
    satisfaction: string;
  }> {
    const activeChats = Array.from(this.conversations.values())
      .filter(conv => conv.status === "active").length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const resolvedToday = Array.from(this.conversations.values())
      .filter(conv => conv.status === "resolved" && conv.updated_at >= today).length;

    return {
      activeChats,
      resolvedToday,
      responseTime: "2.3s",
      satisfaction: "94%"
    };
  }
}

export const storage = new MemStorage();
