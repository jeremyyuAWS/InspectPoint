import React from 'react';
import SupportDashboard from './SupportDashboard';
import ConversationalInterface from '../demo/ConversationalInterface';
import { mockData } from '../../data/mockData';
import { ChevronDown, Filter, Plus, AlertCircle } from 'lucide-react';

const SupportView = () => {
  // Filter messages for a support session
  const supportMessages = mockData.chatSessions.filter(msg => 
    msg.agentType === 'support' || (msg.sender === 'user' && msg.sessionId.includes('support'))
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Support Agent</h2>
        <p className="text-gray-600">AI-powered customer support and case management</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            New Ticket
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
        </div>
        
        <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white">
          <span className="mr-2">Time Range:</span>
          <span className="font-medium">Last 30 Days</span>
          <ChevronDown size={16} className="ml-2" />
        </div>
      </div>
      
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">AI Support Agent Notice</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>The AI Support Agent is currently in learning mode. It will attempt to answer queries, but complex issues may be escalated to human agents. Please review all AI-generated responses for accuracy.</p>
            </div>
          </div>
        </div>
      </div>
      
      <SupportDashboard tickets={mockData.supportTickets} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Knowledge Base</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Installation', 'Configuration', 'Troubleshooting', 'API Integration', 'Billing', 'Security'].map((category, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <h4 className="font-medium text-gray-900">{category}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.floor(Math.random() * 10) + 5} articles
                </p>
              </div>
            ))}
          </div>
          
          <h4 className="text-md font-medium text-gray-900 mt-6 mb-3">Popular Articles</h4>
          
          <div className="space-y-2">
            {['Setting up your first fire alarm design', 'Troubleshooting sensor connectivity issues', 'Integrating with building management systems', 'Upgrading from v1 to v2', 'Understanding compliance requirements'].map((article, idx) => (
              <div key={idx} className="border-l-2 border-blue-500 pl-3 py-1">
                <p className="text-sm font-medium text-blue-700 hover:text-blue-900 cursor-pointer">
                  {article}
                </p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(Date.now() - (idx * 86400000 * 3)).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="h-[500px]">
          <ConversationalInterface 
            messages={supportMessages}
            agentType="support"
          />
        </div>
      </div>
    </div>
  );
};

export default SupportView;