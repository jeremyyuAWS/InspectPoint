import React from 'react';
import Card from '../base/Card';
import { generateCampaignData } from '../../services/mockData';

interface CampaignMetricsProps {
  data: ReturnType<typeof generateCampaignData>;
}

const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ data }) => {
  const latestData = data[data.length - 1];
  const totalSent = data.reduce((acc, day) => acc + day.sent, 0);
  const totalOpened = data.reduce((acc, day) => acc + day.opened, 0);
  const totalClicked = data.reduce((acc, day) => acc + day.clicked, 0);
  const totalReplied = data.reduce((acc, day) => acc + day.replied, 0);

  const openRate = (totalOpened / totalSent) * 100;
  const clickRate = (totalClicked / totalSent) * 100;
  const replyRate = (totalReplied / totalSent) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Emails Sent</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totalSent}</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Open Rate</h4>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{openRate.toFixed(1)}%</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Click Rate</h4>
          <p className="mt-2 text-3xl font-semibold text-green-600">{clickRate.toFixed(1)}%</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Reply Rate</h4>
          <p className="mt-2 text-3xl font-semibold text-purple-600">{replyRate.toFixed(1)}%</p>
        </div>
      </Card>
    </div>
  );
};

export default CampaignMetrics; 