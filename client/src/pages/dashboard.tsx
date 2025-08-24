import { useState } from "react";
import { Bot, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCards from "@/components/stats-cards";
import FaqManagement from "@/components/faq-management";
import RecentConversations from "@/components/recent-conversations";
import ChatWidget from "@/components/chat-widget";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="text-white w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold text-text-color" data-testid="header-title">AI Support Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" data-testid="button-settings">
                <Settings className="h-5 w-5" />
              </Button>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                alt="Admin profile" 
                className="w-8 h-8 rounded-full"
                data-testid="img-admin-profile"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <FaqManagement />
          </div>
          <div className="lg:col-span-1">
            <RecentConversations />
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">AI-Powered Customer Support</h1>
          <p className="text-xl mb-8 text-blue-100" data-testid="text-hero-description">Experience instant, intelligent assistance 24/7 with our advanced chatbot</p>
          <Button className="bg-white text-primary hover:bg-gray-100" size="lg" data-testid="button-try-now">
            Try It Now
          </Button>
        </div>
      </div>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-color mb-4" data-testid="text-features-title">Why Choose Our AI Support?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg" data-testid="text-features-subtitle">Get the help you need, when you need it</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-color mb-2" data-testid="text-feature-1-title">24/7 Availability</h3>
              <p className="text-gray-600 dark:text-gray-400" data-testid="text-feature-1-description">Get instant responses any time of day or night</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="text-accent w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-color mb-2" data-testid="text-feature-2-title">Smart Responses</h3>
              <p className="text-gray-600 dark:text-gray-400" data-testid="text-feature-2-description">AI-powered understanding of your specific needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="text-yellow-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-color mb-2" data-testid="text-feature-3-title">Instant Help</h3>
              <p className="text-gray-600 dark:text-gray-400" data-testid="text-feature-3-description">No waiting in queues, get help immediately</p>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
