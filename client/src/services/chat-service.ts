import { apiRequest } from "@/lib/queryClient";

export interface SendMessageRequest {
  content: string;
  conversationId?: string;
  userName?: string;
}

export interface Message {
  id: string;
  content: string;
  is_user: number;
  conversation_id: string;
  created_at: string;
}

export interface SendMessageResponse {
  conversationId: string;
  userMessage: Message;
  aiMessage: Message;
}

export const chatService = {
  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await apiRequest("POST", "/api/chat/message", data);
    return response.json();
  },

  async getConversation(id: string) {
    const response = await apiRequest("GET", `/api/conversations/${id}`);
    return response.json();
  },

  async getConversationMessages(id: string): Promise<Message[]> {
    const response = await apiRequest("GET", `/api/conversations/${id}/messages`);
    return response.json();
  }
};
