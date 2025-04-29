import React from 'react';
import { Lead } from '../../types';
import Card from '../base/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ICPDistributionProps {
  leads: Lead[];
}

const ICPDistribution: React.FC<ICPDistributionProps> = ({ leads }) => {
  // Create bins for ICP scores
  const bins = Array.from({ length: 10 }, (_, i) => ({
    range: `${i * 10}-${(i + 1) * 10}`,
    count: 0
  }));

  // Count leads in each bin
  leads.forEach(lead => {
    const binIndex = Math.floor(lead.icpScore / 10);
    if (binIndex < 10) {
      bins[binIndex].count++;
    }
  });

  return (
    <Card title="ICP Score Distribution">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ICPDistribution; 