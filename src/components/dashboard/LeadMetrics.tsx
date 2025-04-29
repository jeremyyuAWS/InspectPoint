import React from 'react';
import { Lead } from '../../types';
import Card from '../base/Card';

interface LeadMetricsProps {
  leads: Lead[];
}

const LeadMetrics: React.FC<LeadMetricsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const newLeads = leads.filter(lead => lead.status === 'new').length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length;
  const customerLeads = leads.filter(lead => lead.status === 'customer').length;
  
  const avgICPScore = leads.reduce((acc, lead) => acc + lead.icpScore, 0) / totalLeads;
  const conversionRate = totalLeads > 0 ? (customerLeads / totalLeads) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Leads</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totalLeads}</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">New Leads</h4>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{newLeads}</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Avg ICP Score</h4>
          <p className="mt-2 text-3xl font-semibold text-green-600">{avgICPScore.toFixed(1)}</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Conversion Rate</h4>
          <p className="mt-2 text-3xl font-semibold text-purple-600">{conversionRate.toFixed(1)}%</p>
        </div>
      </Card>
    </div>
  );
};

export default LeadMetrics; 