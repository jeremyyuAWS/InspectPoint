import React from 'react';
import LeadNetworkGraph from './LeadNetworkGraph';
import { mockData } from '../../data/mockData';
import { Search, NetworkIcon, Users, RefreshCw } from 'lucide-react';

const LeadExpansionView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Lead Expansion & Refinement</h2>
        <p className="text-gray-600">Discover related companies and expand your lead database</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Enter a company name to find related organizations..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <NetworkIcon size={16} className="mr-2" />
            Find Related
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Users size={20} className="text-blue-600 mr-2" />
              <h3 className="text-md font-medium text-blue-900">Company Relationships</h3>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Our AI identifies relationships between companies based on:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Parent-subsidiary relationships</li>
              <li>• Shared ownership or management</li>
              <li>• Industry associations</li>
              <li>• Geographic proximity</li>
              <li>• Similar company profiles</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <RefreshCw size={20} className="text-purple-600 mr-2" />
              <h3 className="text-md font-medium text-purple-900">Expansion Metrics</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-900">Initial Lead Count:</span>
                  <span className="font-medium">{mockData.leads.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-900">Expanded Leads:</span>
                  <span className="font-medium">+43</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-purple-900">Expansion Rate:</span>
                  <span className="font-medium">43%</span>
                </div>
              </div>
              
              <div className="w-full bg-purple-200 rounded-full h-1.5">
                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <NetworkIcon size={20} className="text-amber-600 mr-2" />
              <h3 className="text-md font-medium text-amber-900">Network Insights</h3>
            </div>
            <p className="text-sm text-amber-800 mb-2">
              Top network clusters detected:
            </p>
            <ul className="text-sm text-amber-700 space-y-2">
              <li className="flex justify-between">
                <span>New York Metro Area:</span>
                <span className="font-medium">12 companies</span>
              </li>
              <li className="flex justify-between">
                <span>West Coast Tech:</span>
                <span className="font-medium">9 companies</span>
              </li>
              <li className="flex justify-between">
                <span>Southern Construction:</span>
                <span className="font-medium">7 companies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Relationship Network</h3>
        <LeadNetworkGraph leads={mockData.leads} />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recently Discovered Related Companies</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connected To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ICP Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, idx) => {
                const randomSourceIdx = Math.floor(Math.random() * mockData.leads.length);
                const randomSource = mockData.leads[randomSourceIdx];
                const icpScore = Math.floor(Math.random() * 30) + 70; // 70-100
                const confidenceScore = Math.floor(Math.random() * 20) + 75; // 75-95
                
                return (
                  <tr key={`expanded-${idx}`} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {`Related Fire Protection ${idx + 1}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {randomSource.location.split(',')[0]} Area
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-purple-100 text-purple-800">
                        {['Subsidiary', 'Same Industry', 'Regional Partner', 'Similar Profile', 'Business Association'][idx % 5]}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {randomSource.companyName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden mr-2">
                          <div 
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${confidenceScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{confidenceScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden mr-2">
                          <div 
                            className="h-full bg-green-600 rounded-full"
                            style={{ width: `${icpScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{icpScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">
                        Add to Leads
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        Skip
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

export default LeadExpansionView;