import React from 'react';
import { AgentPerformance } from '../../types';

interface PerformanceChartProps {
  data: AgentPerformance[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  // Group data by date and agent type
  const processData = () => {
    const lastSevenDays = data
      .filter(item => {
        const date = new Date(item.date);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return date >= sevenDaysAgo;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Get unique dates
    const uniqueDates = Array.from(new Set(lastSevenDays.map(item => item.date)));
    
    // Get unique agent types
    const agentTypes = ['leadGen', 'outbound', 'demo', 'support'];
    
    // Create data structure
    const chartData = {
      dates: uniqueDates.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      series: agentTypes.map(type => {
        return {
          name: type,
          data: uniqueDates.map(date => {
            const matchingItems = lastSevenDays.filter(item => item.date === date && item.agentType === type);
            const avgSuccessRate = matchingItems.length 
              ? matchingItems.reduce((sum, item) => sum + item.successRate, 0) / matchingItems.length 
              : 0;
            return Math.round(avgSuccessRate * 100);
          })
        };
      })
    };
    
    return chartData;
  };
  
  const chartData = processData();
  
  // Colors for each agent type
  const colors = {
    leadGen: '#60A5FA', // blue
    outbound: '#F59E0B', // amber
    demo: '#10B981', // green
    support: '#8B5CF6' // purple
  };
  
  // Calculate max value for y-axis
  const maxValue = Math.max(
    ...chartData.series.flatMap(series => series.data)
  );
  const yAxisMax = Math.ceil(maxValue / 10) * 10;
  
  // Calculate chart dimensions
  const chartHeight = 200;
  const chartWidth = '100%';
  const barWidth = 12;
  const barGap = 4;
  const groupWidth = (barWidth + barGap) * chartData.series.length;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };
  
  // Function to calculate y position
  const calculateY = (value: number) => {
    return chartHeight - (value / yAxisMax) * chartHeight + padding.top;
  };
  
  // Function to get label for agent type
  const getAgentLabel = (type: string) => {
    switch (type) {
      case 'leadGen': return 'Lead Gen';
      case 'outbound': return 'Outbound';
      case 'demo': return 'Demo';
      case 'support': return 'Support';
      default: return type;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Performance</h3>
      
      <div className="relative" style={{ height: `${chartHeight + padding.top + padding.bottom}px` }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
          {[100, 75, 50, 25, 0].map(value => (
            <div 
              key={value} 
              style={{ top: `${calculateY(value)}px` }}
              className="absolute -translate-y-1/2 -translate-x-1"
            >
              {value}%
            </div>
          ))}
        </div>
        
        {/* Y-axis grid lines */}
        <div className="absolute left-8 right-0 top-0 bottom-0">
          {[100, 75, 50, 25, 0].map(value => (
            <div 
              key={value}
              style={{ top: `${calculateY(value)}px` }}
              className="absolute w-full h-px bg-gray-100"
            />
          ))}
        </div>
        
        {/* Chart bars */}
        <div className="absolute left-10 right-0 top-0 bottom-0">
          <svg width={chartWidth} height={chartHeight + padding.top + padding.bottom}>
            {chartData.series.map((series, seriesIndex) => (
              <g key={series.name}>
                {series.data.map((value, dataIndex) => (
                  <rect
                    key={`${series.name}-${dataIndex}`}
                    x={(dataIndex * (groupWidth + 16)) + (seriesIndex * (barWidth + barGap)) + padding.left}
                    y={calculateY(value)}
                    width={barWidth}
                    height={(value / yAxisMax) * chartHeight}
                    fill={colors[series.name as keyof typeof colors]}
                    rx={2}
                    ry={2}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>
        
        {/* X-axis labels */}
        <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-500">
          {chartData.dates.map((date, index) => (
            <div 
              key={index} 
              style={{ 
                left: `${(index * (groupWidth + 16)) + padding.left + (groupWidth / 2)}px`,
                bottom: `${padding.bottom / 2}px`
              }}
              className="absolute transform -translate-x-1/2"
            >
              {date}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {chartData.series.map(series => (
          <div key={series.name} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-sm mr-1"
              style={{ backgroundColor: colors[series.name as keyof typeof colors] }}
            />
            <span className="text-xs text-gray-700">{getAgentLabel(series.name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;