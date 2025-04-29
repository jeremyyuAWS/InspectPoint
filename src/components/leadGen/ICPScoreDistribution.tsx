import React from 'react';
import { Lead } from '../../types';

interface ICPScoreDistributionProps {
  leads: Lead[];
}

const ICPScoreDistribution: React.FC<ICPScoreDistributionProps> = ({ leads }) => {
  // Group leads by ICP score ranges
  const getScoreDistribution = () => {
    const ranges = [
      { min: 0, max: 20, label: '0-20', color: '#FECACA' },
      { min: 21, max: 40, label: '21-40', color: '#FED7AA' },
      { min: 41, max: 60, label: '41-60', color: '#FEF08A' },
      { min: 61, max: 80, label: '61-80', color: '#BBF7D0' },
      { min: 81, max: 100, label: '81-100', color: '#86EFAC' }
    ];
    
    return ranges.map(range => {
      const count = leads.filter(
        lead => lead.icpScore >= range.min && lead.icpScore <= range.max
      ).length;
      
      return {
        ...range,
        count,
        percentage: leads.length ? (count / leads.length * 100).toFixed(1) : '0.0'
      };
    });
  };
  
  const distribution = getScoreDistribution();
  
  // Get top-scoring lead companies
  const topLeads = [...leads]
    .sort((a, b) => b.icpScore - a.icpScore)
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">ICP Score Distribution</h3>
      
      <div className="space-y-4">
        {distribution.map(range => (
          <div key={range.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{range.label}</span>
              <span className="text-sm text-gray-500">{range.count} leads ({range.percentage}%)</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-in-out"
                style={{ 
                  width: `${range.percentage}%`,
                  backgroundColor: range.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Top Scored Companies</h4>
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ICP Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lead.companyName}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {lead.location}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ICPScoreDistribution;