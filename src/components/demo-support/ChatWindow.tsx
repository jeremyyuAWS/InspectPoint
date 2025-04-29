import React, { useState } from 'react';
import { Bot, Send, Mic, Paperclip, Smile, Clock, CheckCircle } from 'lucide-react';
import Card from '../base/Card';
import Button from '../base/Button';
import ChatInterface from './ChatInterface';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  onNewMessage: (message: string) => void;
  messages: Message[];
  isLoading: boolean;
  onStartDemo?: () => void;
  onEndDemo?: () => void;
  isDemoActive?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  onNewMessage,
  messages,
  isLoading,
  onStartDemo,
  onEndDemo,
  isDemoActive = false,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Firecat AI Assistant</h3>
            <div className="flex items-center gap-1">
              {isTyping ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-500">Typing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span className="text-sm text-gray-500">Online</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface
          onNewMessage={onNewMessage}
          messages={messages}
          isLoading={isLoading}
        />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="w-5 h-5" />
          </Button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={handleTyping}
            disabled={isLoading}
          />
          <Button variant="ghost" size="sm">
            <Mic className="w-5 h-5" />
          </Button>
          <Button variant="primary" size="sm">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Demo Controls */}
      {onStartDemo && onEndDemo && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-center gap-4">
            {!isDemoActive ? (
              <Button
                variant="primary"
                onClick={onStartDemo}
                className="flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                Start Demo
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onEndDemo}
                className="flex items-center gap-2"
              >
                End Demo
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ChatWindow; 