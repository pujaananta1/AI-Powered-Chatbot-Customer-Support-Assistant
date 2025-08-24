import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, CheckCircle, Clock, Star } from "lucide-react";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400" data-testid="text-active-chats-label">Active Chats</p>
              <p className="text-2xl font-bold text-text-color" data-testid="text-active-chats-value">{stats?.activeChats || 0}</p>
            </div>
            <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
              <MessageCircle className="text-primary w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400" data-testid="text-resolved-label">Resolved Today</p>
              <p className="text-2xl font-bold text-text-color" data-testid="text-resolved-value">{stats?.resolvedToday || 0}</p>
            </div>
            <div className="p-3 bg-accent bg-opacity-10 rounded-lg">
              <CheckCircle className="text-accent w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400" data-testid="text-response-time-label">Response Time</p>
              <p className="text-2xl font-bold text-text-color" data-testid="text-response-time-value">{stats?.responseTime || "0s"}</p>
            </div>
            <div className="p-3 bg-yellow-500 bg-opacity-10 rounded-lg">
              <Clock className="text-yellow-500 w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400" data-testid="text-satisfaction-label">Satisfaction</p>
              <p className="text-2xl font-bold text-text-color" data-testid="text-satisfaction-value">{stats?.satisfaction || "0%"}</p>
            </div>
            <div className="p-3 bg-green-500 bg-opacity-10 rounded-lg">
              <Star className="text-green-500 w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
