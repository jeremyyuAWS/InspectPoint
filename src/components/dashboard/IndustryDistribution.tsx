import React from 'react';
import { Lead } from '../../types';
import Card from '../base/Card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface IndustryDistributionProps {
  leads: Lead[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const IndustryDistribution: React.FC<IndustryDistributionProps> = ({ leads }) => {
  // Count leads by industry
  const industryCounts = leads.reduce((acc, lead) => {
    acc[lead.industry] = (acc[lead.industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array format for PieChart
  const data = Object.entries(industryCounts).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <Card title="Industry Distribution">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IndustryDistribution; 