import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  content: string;
  is_user: number;
  created_at: string;
}

interface ChatResponse {
  conversationId: string;
  userMessage: Message;
  aiMessage: Message;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/chat/message", {
        content,
        conversationId,
        userName: "Anonymous User"
      });
      return response.json() as Promise<ChatResponse>;
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, data.userMessage, data.aiMessage]);
      setConversationId(data.conversationId);
      setIsTyping(false);
    },
    onError: () => {
      setIsTyping(false);
    }
  });

  const handleSendMessage = () => {
    if (!inputValue.trim() || sendMessageMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      is_user: 1,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    sendMessageMutation.mutate(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (message: string) => {
    setInputValue(message);
    setTimeout(handleSendMessage, 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Add welcome message on first open
      const welcomeMessage: Message = {
        id: "welcome",
        content: "Hi! I'm your AI assistant. How can I help you today?",
        is_user: 0,
        created_at: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="chat-widget">
      {/* Chat Toggle Button */}
      <div 
        className={`w-14 h-14 bg-primary rounded-full shadow-lg cursor-pointer flex items-center justify-center hover:bg-blue-600 transition-colors float-animation ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        data-testid="button-chat-toggle"
      >
        <MessageCircle className="text-white w-6 h-6" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl chat-widget border border-gray-200 dark:border-gray-700 flex flex-col" data-testid="chat-window">
          {/* Chat Header */}
          <div className="bg-primary rounded-t-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot className="text-white w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm" data-testid="text-chat-title">AI Support</h3>
                <p className="text-white text-opacity-80 text-xs" data-testid="text-chat-subtitle">Typically replies instantly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-20"
              data-testid="button-close-chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto" data-testid="chat-messages">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex items-start space-x-2 message-slide-in ${message.is_user ? 'justify-end' : ''}`} data-testid={`message-${index}`}>
                {!message.is_user && (
                  <div className="w-8 h-8 bg-ai-bubble rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-gray-600 w-3 h-3" />
                  </div>
                )}
                <div className={`rounded-lg px-3 py-2 max-w-xs ${
                  message.is_user 
                    ? 'bg-primary text-white ml-auto' 
                    : 'bg-ai-bubble text-text-color'
                }`}>
                  <p className="text-sm" data-testid={`text-message-content-${index}`}>{message.content}</p>
                </div>
              </div>
            ))}

            {/* Quick Reply Options (show only after welcome message) */}
            {messages.length === 1 && messages[0].id === "welcome" && (
              <div className="flex flex-wrap gap-2 mt-3">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleQuickReply("I need help with my account")}
                  data-testid="button-quick-account"
                >
                  Account Help
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleQuickReply("I want to track my order")}
                  data-testid="button-quick-order"
                >
                  Track Order
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleQuickReply("I have a billing question")}
                  data-testid="button-quick-billing"
                >
                  Billing
                </Button>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2" data-testid="typing-indicator">
                <div className="w-8 h-8 bg-ai-bubble rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-gray-600 w-3 h-3" />
                </div>
                <div className="bg-ai-bubble rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-indicator"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
                disabled={sendMessageMutation.isPending}
                data-testid="input-chat-message"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || sendMessageMutation.isPending}
                className="bg-primary text-white hover:bg-blue-600"
                size="sm"
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
