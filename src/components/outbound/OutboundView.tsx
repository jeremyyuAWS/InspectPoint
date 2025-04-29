import React from 'react';
import CampaignPerformance from './CampaignPerformance';
import { mockData } from '../../data/mockData';
import { Mail, Plus, Edit, Copy, Trash, ChevronDown } from 'lucide-react';

const OutboundView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Outbound Campaign</h2>
        <p className="text-gray-600">AI-powered email campaign management</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            New Campaign
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Mail size={16} className="mr-2" />
            Email Templates
          </button>
        </div>
        
        <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white">
          <span className="mr-2">Campaign Status:</span>
          <span className="font-medium">All</span>
          <ChevronDown size={16} className="ml-2" />
        </div>
      </div>
      
      <CampaignPerformance campaigns={mockData.campaigns} />
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Active Campaigns</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.campaigns
            .filter(campaign => campaign.status === 'active')
            .slice(0, 3)
            .map(campaign => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-blue-900">{campaign.name}</h4>
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Edit size={14} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">{campaign.description}</p>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Start Date:</span>
                    <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Leads:</span>
                    <span>{campaign.leads.length}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Emails Sent:</span>
                    <span>{campaign.emailsSent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Open Rate:</span>
                    <span>{(campaign.emailsOpened / campaign.emailsSent * 100).toFixed(1)}%</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      Pause
                    </button>
                    <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sequence</th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.emailTemplates.slice(0, 5).map(template => {
                const campaign = mockData.campaigns.find(c => c.id === template.campaignId);
                
                return (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {template.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {campaign?.name || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {template.subject}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {template.sequencePosition}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 mr-3">
                        Duplicate
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OutboundView;