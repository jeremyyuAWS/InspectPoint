import React, { useState } from 'react';
import Card from '../base/Card';
import Button from '../base/Button';
import { MessageSquare, HelpCircle, BookOpen, BarChart2, Clock, CheckCircle } from 'lucide-react';

interface Conversation {
  id: string;
  type: 'demo' | 'support';
  status: 'active' | 'completed';
  startTime: string;
  endTime?: string;
  messages: {
    id: string;
    sender: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  sentiment: number;
  topic: string;
}

interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  resolvedAt?: string;
  category: string;
  assignedTo?: string;
  skuReferences: string[];
}

const DemoSupportDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'support'>('demo');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      type: 'demo',
      status: 'completed',
      startTime: '2024-04-28T10:00:00',
      endTime: '2024-04-28T10:30:00',
      messages: [
        {
          id: '1',
          sender: 'user',
          content: 'Can you show me how to create a new fire alarm system design?',
          timestamp: '2024-04-28T10:00:00'
        },
        {
          id: '2',
          sender: 'assistant',
          content: 'I\'d be happy to help you create a new fire alarm system design. Let\'s start by selecting the building type...',
          timestamp: '2024-04-28T10:00:05'
        }
      ],
      sentiment: 0.8,
      topic: 'System Design'
    }
  ]);

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      title: 'Cannot connect to cloud sync',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-04-27T14:30:00',
      resolvedAt: '2024-04-27T15:45:00',
      category: 'Technical',
      assignedTo: 'Support Agent 1',
      skuReferences: ['FC-1000', 'FC-2000']
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Demo & Support Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'demo' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('demo')}
          >
            Demo Assistant
          </Button>
          <Button
            variant={activeTab === 'support' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('support')}
          >
            Support Agent
          </Button>
        </div>
      </div>

      {activeTab === 'demo' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Active Conversations</h3>
              </div>
              <div className="space-y-4">
                {conversations.map(conversation => (
                  <div key={conversation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{conversation.topic}</p>
                        <p className="text-sm text-gray-500">
                          Started: {new Date(conversation.startTime).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        conversation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {conversation.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Sentiment: {(conversation.sentiment * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Knowledge Base</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">FAQs</h4>
                  <p className="text-sm text-gray-500">1,500 articles</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Training Materials</h4>
                  <p className="text-sm text-gray-500">50 guides</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Support Tickets</h3>
              </div>
              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{ticket.title}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                        ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {ticket.resolvedAt ? 
                            `Resolved in ${Math.round((new Date(ticket.resolvedAt).getTime() - new Date(ticket.createdAt).getTime()) / 60000)}m` :
                            'In progress'
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {ticket.assignedTo || 'Unassigned'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">SKU Knowledge Base</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Total SKUs</h4>
                  <p className="text-sm text-gray-500">15,000 items</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <p className="text-sm text-gray-500">25 categories</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DemoSupportDashboard; 