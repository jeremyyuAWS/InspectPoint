import React from 'react';
import { Campaign } from '../../types';

interface CampaignPerformanceProps {
  campaigns: Campaign[];
}

const CampaignPerformance: React.FC<CampaignPerformanceProps> = ({ campaigns }) => {
  // Sort campaigns by emails sent (descending)
  const sortedCampaigns = [...campaigns]
    .sort((a, b) => b.emailsSent - a.emailsSent)
    .slice(0, 5);
  
  // Calculate overall metrics
  const totalMetrics = campaigns.reduce(
    (acc, campaign) => {
      acc.emailsSent += campaign.emailsSent;
      acc.emailsOpened += campaign.emailsOpened;
      acc.emailsClicked += campaign.emailsClicked;
      acc.emailsReplied += campaign.emailsReplied;
      return acc;
    },
    { emailsSent: 0, emailsOpened: 0, emailsClicked: 0, emailsReplied: 0 }
  );
  
  const rates = {
    openRate: totalMetrics.emailsSent ? (totalMetrics.emailsOpened / totalMetrics.emailsSent * 100).toFixed(1) : '0.0',
    clickRate: totalMetrics.emailsOpened ? (totalMetrics.emailsClicked / totalMetrics.emailsOpened * 100).toFixed(1) : '0.0',
    replyRate: totalMetrics.emailsClicked ? (totalMetrics.emailsReplied / totalMetrics.emailsClicked * 100).toFixed(1) : '0.0'
  };
  
  // Calculate campaign performance score (simplified)
  const getCampaignScore = (campaign: Campaign) => {
    const openRate = campaign.emailsSent ? campaign.emailsOpened / campaign.emailsSent : 0;
    const clickRate = campaign.emailsOpened ? campaign.emailsClicked / campaign.emailsOpened : 0;
    const replyRate = campaign.emailsClicked ? campaign.emailsReplied / campaign.emailsClicked : 0;
    
    return (openRate * 0.3 + clickRate * 0.3 + replyRate * 0.4) * 100;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <p className="text-xs text-amber-800 font-medium">Open Rate</p>
          <p className="text-2xl font-bold text-amber-700">{rates.openRate}%</p>
          <div className="mt-2 w-full bg-amber-200 rounded-full h-1.5">
            <div 
              className="bg-amber-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(parseFloat(rates.openRate) * 2, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
          <p className="text-xs text-green-800 font-medium">Click Rate</p>
          <p className="text-2xl font-bold text-green-700">{rates.clickRate}%</p>
          <div className="mt-2 w-full bg-green-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(parseFloat(rates.clickRate) * 2, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-xs text-blue-800 font-medium">Reply Rate</p>
          <p className="text-2xl font-bold text-blue-700">{rates.replyRate}%</p>
          <div className="mt-2 w-full bg-blue-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${Math.min(parseFloat(rates.replyRate) * 2, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <h4 className="text-sm font-medium text-gray-700 mb-3">Top Campaign Performance</h4>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opened</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicked</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCampaigns.map(campaign => {
              const score = getCampaignScore(campaign);
              
              return (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-xs text-gray-500">{new Date(campaign.startDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {campaign.emailsSent}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">
                        {campaign.emailsOpened}
                      </span>
                      <span className="text-xs text-amber-600">
                        ({campaign.emailsSent ? (campaign.emailsOpened / campaign.emailsSent * 100).toFixed(1) : '0.0'}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">
                        {campaign.emailsClicked}
                      </span>
                      <span className="text-xs text-green-600">
                        ({campaign.emailsOpened ? (campaign.emailsClicked / campaign.emailsOpened * 100).toFixed(1) : '0.0'}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min(score, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{score.toFixed(1)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-800">
          View all campaigns →
        </button>
      </div>
    </div>
  );
};

export default CampaignPerformance;