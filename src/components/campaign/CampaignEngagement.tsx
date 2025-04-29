import React from 'react';
import Card from '../base/Card';
import { generateCampaignData } from '../../services/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CampaignEngagementProps {
  data: ReturnType<typeof generateCampaignData>;
}

const CampaignEngagement: React.FC<CampaignEngagementProps> = ({ data }) => {
  // Calculate engagement rates for each day
  const engagementData = data.map(day => ({
    date: day.date,
    openRate: (day.opened / day.sent) * 100,
    clickRate: (day.clicked / day.sent) * 100,
    replyRate: (day.replied / day.sent) * 100
  }));

  return (
    <Card title="Engagement Rates">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Rate']}
            />
            <Bar dataKey="openRate" fill="#8884d8" name="Open Rate" />
            <Bar dataKey="clickRate" fill="#82ca9d" name="Click Rate" />
            <Bar dataKey="replyRate" fill="#ffc658" name="Reply Rate" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CampaignEngagement; 