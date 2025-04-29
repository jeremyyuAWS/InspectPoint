import React from 'react';
import LeadGeoHeatmap from './LeadGeoHeatmap';
import ICPScoreDistribution from './ICPScoreDistribution';
import { mockData } from '../../data/mockData';
import { Search, Filter, Download, Plus } from 'lucide-react';

const LeadGenView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Lead Generation</h2>
        <p className="text-gray-600">AI-powered lead identification and enrichment</p>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search leads by company, location, or contact..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            New Lead
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadGeoHeatmap leads={mockData.leads} />
        <ICPScoreDistribution leads={mockData.leads} />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Lead Database</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ICP Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Contact</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.leads.slice(0, 10).map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.companyName}</div>
                    <div className="text-xs text-gray-500">{lead.techStack.join(', ')}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {lead.location}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.contactName}</div>
                    <div className="text-xs text-gray-500">{lead.contactEmail}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {lead.employees}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden mr-2">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${lead.icpScore}%`,
                            backgroundColor: lead.icpScore >= 80 ? '#86EFAC' : 
                                           lead.icpScore >= 60 ? '#BBF7D0' :
                                           lead.icpScore >= 40 ? '#FEF08A' :
                                           lead.icpScore >= 20 ? '#FED7AA' : '#FECACA'
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{lead.icpScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'contacted' ? 'bg-purple-100 text-purple-800' :
                      lead.status === 'qualified' ? 'bg-amber-100 text-amber-800' :
                      lead.status === 'opportunity' ? 'bg-orange-100 text-orange-800' :
                      lead.status === 'customer' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {lead.lastContacted ? new Date(lead.lastContacted).toLocaleDateString() : 'Never'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{mockData.leads.length}</span> leads
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadGenView;