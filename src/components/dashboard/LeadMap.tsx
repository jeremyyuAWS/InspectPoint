import React from 'react';
import { Lead } from '../../types';
import Card from '../base/Card';

interface LeadMapProps {
  leads: Lead[];
}

const LeadMap: React.FC<LeadMapProps> = ({ leads }) => {
  // Group leads by location
  const locationCounts = leads.reduce((acc, lead) => {
    acc[lead.location] = (acc[lead.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort locations by lead count
  const sortedLocations = Object.entries(locationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <Card title="Top Lead Locations">
      <div className="space-y-4">
        {sortedLocations.map(([location, count]) => (
          <div key={location} className="flex items-center">
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{location}</span>
                <span className="text-gray-500">{count} leads</span>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(count / leads.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeadMap; 