import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { MessageCircleQuestion, ChevronRight, ThumbsUp, ThumbsDown, MoreHorizontal, User } from 'lucide-react';

interface ConversationalInterfaceProps {
  messages: ChatMessage[];
  agentType: 'demo' | 'onboarding' | 'support' | 'sales';
}

const ConversationalInterface: React.FC<ConversationalInterfaceProps> = ({ messages, agentType }) => {
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get agent name based on type
  const getAgentName = () => {
    switch(agentType) {
      case 'demo': return 'Demo Assistant';
      case 'onboarding': return 'Onboarding Guide';
      case 'support': return 'Support Agent';
      case 'sales': return 'Sales Advisor';
    }
  };
  
  // Get agent avatar color based on type
  const getAgentColor = () => {
    switch(agentType) {
      case 'demo': return 'bg-green-100 text-green-600';
      case 'onboarding': return 'bg-blue-100 text-blue-600';
      case 'support': return 'bg-purple-100 text-purple-600';
      case 'sales': return 'bg-amber-100 text-amber-600';
    }
  };
  
  // Get agent icon based on type
  const getAgentIcon = () => {
    return <MessageCircleQuestion size={18} />;
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
      sessionId: 'current-session'
    };
    
    setCurrentMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        agentType,
        content: `This is a simulated response from ${getAgentName()} to your query: "${inputValue}"`,
        timestamp: new Date().toISOString(),
        sessionId: 'current-session'
      };
      
      setCurrentMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Load initial messages
  useEffect(() => {
    if (messages.length > 0) {
      // Display first message immediately, then add others with delay
      setCurrentMessages([messages[0]]);
      
      let index = 1;
      
      const interval = setInterval(() => {
        if (index < messages.length) {
          setCurrentMessages(prev => [...prev, messages[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [messages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);
  
  // Render message bubble
  const renderMessage = (message: ChatMessage) => {
    if (message.sender === 'user') {
      return (
        <div className="flex justify-end mb-4">
          <div className="flex items-end max-w-3/4">
            <div className="bg-blue-600 text-white rounded-2xl rounded-br-none py-2 px-4 mr-2">
              <p>{message.content}</p>
              <span className="text-xs text-blue-200 block text-right mt-1">
                {formatTime(message.timestamp)}
              </span>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex mb-4">
          <div className="flex items-end max-w-3/4">
            <div className={`w-8 h-8 ${getAgentColor()} rounded-full flex items-center justify-center`}>
              {getAgentIcon()}
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-none py-2 px-4 ml-2">
              <p>{message.content}</p>
              <span className="text-xs text-gray-500 block mt-1">
                {formatTime(message.timestamp)}
              </span>
              <div className="flex space-x-2 mt-2">
                <button className="p-1 hover:bg-gray-200 rounded-full" title="Helpful">
                  <ThumbsUp size={14} className="text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full" title="Not Helpful">
                  <ThumbsDown size={14} className="text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full" title="More Options">
                  <MoreHorizontal size={14} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className={`w-8 h-8 ${getAgentColor()} rounded-full flex items-center justify-center mr-3`}>
            {getAgentIcon()}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{getAgentName()}</h3>
            <p className="text-xs text-gray-500">AI-powered assistant</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-gray-600">
            I'm your {getAgentName().toLowerCase()}, trained to help with Firecat's fire alarm design software. 
            How can I assist you today?
          </p>
        </div>
        
        {currentMessages.map(message => (
          <div key={message.id}>
            {renderMessage(message)}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex mb-4">
            <div className="flex items-end">
              <div className={`w-8 h-8 ${getAgentColor()} rounded-full flex items-center justify-center`}>
                {getAgentIcon()}
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-none py-2 px-4 ml-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ChevronRight size={20} />
          </button>
        </form>
        
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>Powered by Firecat AI</span>
          <button className="text-blue-600 hover:text-blue-800">
            Start over
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationalInterface;