import React from 'react';
import OverviewStats from './OverviewStats';
import PerformanceChart from './PerformanceChart';
import LeadFunnel from './LeadFunnel';
import { mockData } from '../../data/mockData';

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h2>
        <p className="text-gray-600">Overview of your multi-agent platform performance</p>
      </div>
      
      <OverviewStats metrics={mockData.dashboardMetrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={mockData.agentPerformance} />
        <LeadFunnel leads={mockData.leads} />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {mockData.chatSessions.slice(0, 5).map((message, idx) => (
            <div key={idx} className="flex items-start border-l-2 border-blue-500 pl-4 py-1">
              <div className="flex-1">
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleString()} • 
                  {message.sender === 'user' ? ' User Query' : ` ${message.agentType} Agent`}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View all activity →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;