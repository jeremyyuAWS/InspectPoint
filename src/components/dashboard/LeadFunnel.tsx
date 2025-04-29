import React, { useState } from 'react';
import { Lead } from '../../types';
import Card from '../base/Card';

interface LeadFunnelProps {
  leads: Lead[];
}

const LeadFunnel: React.FC<LeadFunnelProps> = ({ leads }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Get unique industries and locations for filters
  const industries = ['all', ...new Set(leads.map(lead => lead.industry))];
  const locations = ['all', ...new Set(leads.map(lead => lead.location))];

  // Filter leads based on selections
  const filteredLeads = leads.filter(lead => {
    const industryMatch = selectedIndustry === 'all' || lead.industry === selectedIndustry;
    const locationMatch = selectedLocation === 'all' || lead.location === selectedLocation;
    return industryMatch && locationMatch;
  });

  // Calculate counts for each stage
  const counts = {
    new: filteredLeads.filter(lead => lead.status === 'new').length,
    contacted: filteredLeads.filter(lead => lead.status === 'contacted').length,
    qualified: filteredLeads.filter(lead => lead.status === 'qualified').length,
    opportunity: filteredLeads.filter(lead => lead.status === 'opportunity').length,
    customer: filteredLeads.filter(lead => lead.status === 'customer').length
  };
  
  // Calculate percentages for visual representation
  const total = filteredLeads.length;
  const percentages = {
    new: (counts.new / total) * 100,
    contacted: (counts.contacted / total) * 100,
    qualified: (counts.qualified / total) * 100,
    opportunity: (counts.opportunity / total) * 100,
    customer: (counts.customer / total) * 100
  };
  
  // Calculate conversion rates between stages
  const conversionRates = {
    newToContacted: counts.new ? (counts.contacted / counts.new) * 100 : 0,
    contactedToQualified: counts.contacted ? (counts.qualified / counts.contacted) * 100 : 0,
    qualifiedToOpportunity: counts.qualified ? (counts.opportunity / counts.qualified) * 100 : 0,
    opportunityToCustomer: counts.opportunity ? (counts.customer / counts.opportunity) * 100 : 0
  };

  return (
    <Card title="Lead Conversion Funnel">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex space-x-4">
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry === 'all' ? 'All Industries' : industry}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>

        {/* Funnel Stages */}
        <div className="space-y-6">
          {/* New Leads */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">New Leads</span>
              <span className="text-sm text-gray-500">{counts.new}</span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentages.new}%` }}
              />
            </div>
          </div>
          
          {/* Conversion arrow */}
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-gray-300"></div>
            <div className="absolute text-xs text-gray-500 px-2 bg-white rounded">
              {conversionRates.newToContacted.toFixed(1)}% →
            </div>
          </div>
          
          {/* Contacted */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Contacted</span>
              <span className="text-sm text-gray-500">{counts.contacted}</span>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentages.contacted}%` }}
              />
            </div>
          </div>
          
          {/* Conversion arrow */}
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-gray-300"></div>
            <div className="absolute text-xs text-gray-500 px-2 bg-white rounded">
              {conversionRates.contactedToQualified.toFixed(1)}% →
            </div>
          </div>
          
          {/* Qualified */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Qualified</span>
              <span className="text-sm text-gray-500">{counts.qualified}</span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentages.qualified}%` }}
              />
            </div>
          </div>
          
          {/* Conversion arrow */}
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-gray-300"></div>
            <div className="absolute text-xs text-gray-500 px-2 bg-white rounded">
              {conversionRates.qualifiedToOpportunity.toFixed(1)}% →
            </div>
          </div>
          
          {/* Opportunity */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Opportunity</span>
              <span className="text-sm text-gray-500">{counts.opportunity}</span>
            </div>
            <div className="w-full bg-amber-100 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentages.opportunity}%` }}
              />
            </div>
          </div>
          
          {/* Conversion arrow */}
          <div className="flex items-center justify-center">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-gray-300"></div>
            <div className="absolute text-xs text-gray-500 px-2 bg-white rounded">
              {conversionRates.opportunityToCustomer.toFixed(1)}% →
            </div>
          </div>
          
          {/* Customer */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Customer</span>
              <span className="text-sm text-gray-500">{counts.customer}</span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentages.customer}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeadFunnel;