import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  title?: string;
  xAxisKey: string;
  yAxisKey: string;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({ data, title, xAxisKey, yAxisKey, className = '' }) => {
  return (
    <div className={`w-full h-[400px] ${className}`}>
      {title && <h4 className="text-lg font-medium text-gray-900 mb-4">{title}</h4>}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yAxisKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart; 