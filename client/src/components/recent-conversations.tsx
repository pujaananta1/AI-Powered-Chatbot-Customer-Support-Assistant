import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ConversationWithMessage {
  id: string;
  user_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  lastMessage: string;
  messageCount: number;
}

export default function RecentConversations() {
  const { data: conversations, isLoading } = useQuery<ConversationWithMessage[]>({
    queryKey: ["/api/conversations"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-accent/10 text-accent";
      case "active":
        return "bg-primary/10 text-primary";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-accent";
      case "active":
        return "bg-primary";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const avatars = [
    "https://images.unsplash.com/photo-1494790108755-2616b612b672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-100 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-text-color" data-testid="text-conversations-title">Recent Conversations</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {conversations?.map((conversation, index) => (
            <div 
              key={conversation.id} 
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              data-testid={`card-conversation-${conversation.id}`}
            >
              <img 
                src={avatars[index % avatars.length]} 
                alt="User avatar" 
                className="w-10 h-10 rounded-full"
                data-testid={`img-avatar-${conversation.id}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-text-color text-sm" data-testid={`text-user-name-${conversation.id}`}>
                    {conversation.user_name}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400" data-testid={`text-time-${conversation.id}`}>
                    {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate" data-testid={`text-last-message-${conversation.id}`}>
                  {conversation.lastMessage}
                </p>
                <div className="flex items-center mt-1">
                  <span className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(conversation.status)}`}></span>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(conversation.status)}`} data-testid={`badge-status-${conversation.id}`}>
                    {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          )) || (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid="text-no-conversations">
              No conversations yet
            </div>
          )}
        </div>
        
        {conversations && conversations.length > 0 && (
          <button className="w-full mt-4 text-primary text-sm font-medium hover:text-blue-600 transition-colors" data-testid="button-view-all">
            View all conversations
          </button>
        )}
      </CardContent>
    </Card>
  );
}
