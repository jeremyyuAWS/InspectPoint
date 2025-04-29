import React from 'react';
import ConversationalInterface from './ConversationalInterface';
import { mockData } from '../../data/mockData';
import { MessageCircleQuestion, FileQuestion, BookOpen, BarChart3 } from 'lucide-react';

const DemoView = () => {
  // Filter messages for a demo session
  const demoMessages = mockData.chatSessions.filter(msg => 
    msg.agentType === 'demo' || (msg.sender === 'user' && msg.sessionId.includes('demo'))
  );
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Demo Assistant ("Ask August")</h2>
        <p className="text-gray-600">AI-powered demo and onboarding guidance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-[700px]">
          <ConversationalInterface 
            messages={demoMessages}
            agentType="demo"
          />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Demo Resources</h3>
            
            <div className="space-y-3">
              <button className="w-full flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <FileQuestion size={16} className="mr-2" />
                <span className="text-sm">Product Overview</span>
              </button>
              <button className="w-full flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <BookOpen size={16} className="mr-2" />
                <span className="text-sm">Feature Documentation</span>
              </button>
              <button className="w-full flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                <BarChart3 size={16} className="mr-2" />
                <span className="text-sm">ROI Calculator</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Demo History</h3>
            
            <div className="space-y-3">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="border-l-2 border-blue-500 pl-3 py-1">
                  <p className="text-sm font-medium">Demo Session #{idx + 1}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(Date.now() - (idx * 86400000)).toLocaleDateString()}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">
                      Completed
                    </span>
                    <span className="text-xs text-gray-500">
                      {12 + idx} minutes
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800">
              View all sessions →
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Demo Performance</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Avg. Demo Length</span>
                  <span className="font-medium">14 min</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">User Satisfaction</span>
                  <span className="font-medium">93%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoView;