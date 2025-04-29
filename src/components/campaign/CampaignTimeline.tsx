import React from 'react';
import Card from '../base/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateCampaignData } from '../../services/mockData';

interface CampaignTimelineProps {
  data: ReturnType<typeof generateCampaignData>;
}

const CampaignTimeline: React.FC<CampaignTimelineProps> = ({ data }) => {
  return (
    <Card title="Campaign Performance Over Time">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend />
            <Line type="monotone" dataKey="sent" stroke="#8884d8" name="Sent" />
            <Line type="monotone" dataKey="opened" stroke="#82ca9d" name="Opened" />
            <Line type="monotone" dataKey="clicked" stroke="#ffc658" name="Clicked" />
            <Line type="monotone" dataKey="replied" stroke="#ff8042" name="Replied" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CampaignTimeline; 