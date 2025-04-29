import React from 'react';
import { Lead } from '../../types';

interface LeadGeoHeatmapProps {
  leads: Lead[];
}

const LeadGeoHeatmap: React.FC<LeadGeoHeatmapProps> = ({ leads }) => {
  // Simplified US map regions
  const regions = [
    { id: 'northwest', name: 'Northwest', states: ['WA', 'OR', 'ID', 'MT', 'WY'], color: '#e5f5e0' },
    { id: 'southwest', name: 'Southwest', states: ['CA', 'NV', 'UT', 'AZ', 'NM', 'CO'], color: '#a1d99b' },
    { id: 'midwest', name: 'Midwest', states: ['ND', 'SD', 'NE', 'KS', 'MN', 'IA', 'MO', 'WI', 'IL', 'IN', 'OH', 'MI'], color: '#74c476' },
    { id: 'northeast', name: 'Northeast', states: ['NY', 'PA', 'NJ', 'CT', 'RI', 'MA', 'VT', 'NH', 'ME'], color: '#31a354' },
    { id: 'southeast', name: 'Southeast', states: ['TX', 'OK', 'AR', 'LA', 'MS', 'AL', 'TN', 'KY', 'GA', 'FL', 'SC', 'NC', 'VA', 'WV', 'MD', 'DE'], color: '#006d2c' },
    { id: 'canada-west', name: 'Canada West', states: ['BC', 'AB'], color: '#bdd7e7' },
    { id: 'canada-central', name: 'Canada Central', states: ['ON', 'QC'], color: '#6baed6' },
    { id: 'canada-east', name: 'Canada East', states: ['NB', 'NS', 'PE', 'NL'], color: '#3182bd' }
  ];
  
  // Count leads by region
  const getLeadCountByRegion = () => {
    const regionCounts = regions.map(region => {
      const count = leads.filter(lead => {
        const location = lead.location;
        return region.states.some(state => location.endsWith(state));
      }).length;
      
      // Calculate heat intensity (0-100%)
      const maxLeads = Math.max(...regions.map(r => 
        leads.filter(lead => r.states.some(state => lead.location.endsWith(state))).length
      ));
      
      const intensity = maxLeads ? count / maxLeads : 0;
      
      return {
        ...region,
        leadCount: count,
        intensity
      };
    });
    
    return regionCounts;
  };
  
  const regionData = getLeadCountByRegion();
  
  // Function to get color intensity
  const getHeatColor = (baseColor: string, intensity: number) => {
    // For this example we'll use a simple opacity approach
    // In a real implementation, you might want to use a proper color gradient
    return {
      backgroundColor: baseColor,
      opacity: 0.3 + (intensity * 0.7) // 0.3 to 1.0 based on intensity
    };
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Geographic Distribution</h3>
      
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-4">
          {regionData.map(region => (
            <div 
              key={region.id}
              className="relative rounded-md overflow-hidden p-3 border border-gray-100"
              style={getHeatColor(region.color, region.intensity)}
            >
              <h4 className="font-medium text-gray-900">{region.name}</h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-700">{region.leadCount} leads</span>
                <span className="text-xs bg-gray-100 bg-opacity-70 px-2 py-0.5 rounded-full">
                  {region.states.join(', ')}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 mx-auto w-full max-w-xs">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Lower Concentration</span>
            <span>Higher Concentration</span>
          </div>
          <div className="h-2 w-full mt-1 bg-gradient-to-r from-gray-200 via-green-300 to-green-700 rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Top Regions by ICP Score</h4>
        <div className="space-y-2">
          {regionData
            .sort((a, b) => b.leadCount - a.leadCount)
            .slice(0, 3)
            .map(region => (
              <div key={`top-${region.id}`} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-sm mr-2" 
                    style={{ backgroundColor: region.color }}
                  ></div>
                  <span className="text-sm">{region.name}</span>
                </div>
                <div className="text-sm font-medium">{region.leadCount} leads</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeadGeoHeatmap;