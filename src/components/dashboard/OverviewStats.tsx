import React from 'react';
import { ArrowUpRight, ArrowDownRight, Users, Mail, MessageCircleQuestion, Headphones } from 'lucide-react';
import { DashboardMetrics } from '../../types';

interface OverviewStatsProps {
  metrics: DashboardMetrics;
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ metrics }) => {
  const stats = [
    {
      title: 'New Leads',
      value: metrics.newLeads,
      change: 12.5,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      positive: true
    },
    {
      title: 'Qualified Leads',
      value: metrics.qualifiedLeads,
      change: 8.2,
      icon: <Users className="h-6 w-6 text-green-600" />,
      positive: true
    },
    {
      title: 'Active Campaigns',
      value: metrics.activeCampaigns,
      change: 0,
      icon: <Mail className="h-6 w-6 text-amber-600" />,
      positive: true
    },
    {
      title: 'Open Support Tickets',
      value: metrics.openSupportTickets,
      change: -4.3,
      icon: <Headphones className="h-6 w-6 text-red-600" />,
      positive: false
    },
    {
      title: 'Lead Conversion',
      value: `${(metrics.leadConversionRate * 100).toFixed(1)}%`,
      change: 2.1,
      icon: <ArrowUpRight className="h-6 w-6 text-purple-600" />,
      positive: true
    },
    {
      title: 'Demo Completion',
      value: `${(metrics.demoCompletionRate * 100).toFixed(1)}%`,
      change: 5.7,
      icon: <MessageCircleQuestion className="h-6 w-6 text-indigo-600" />,
      positive: true
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-4 transform transition-transform duration-200 hover:scale-[1.01] hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className="rounded-full p-2 bg-gray-50">{stat.icon}</div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center mt-1">
                {stat.change !== 0 && (
                  <>
                    {stat.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span 
                      className={stat.positive ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}
                    >
                      {Math.abs(stat.change)}%
                    </span>
                  </>
                )}
                {stat.change === 0 && (
                  <span className="text-gray-500 text-sm">No change</span>
                )}
                <span className="text-gray-500 text-sm ml-1">vs last week</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;