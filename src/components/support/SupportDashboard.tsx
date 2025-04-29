import React from 'react';
import { SupportTicket } from '../../types';
import { Clock, AlertTriangle, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';

interface SupportDashboardProps {
  tickets: SupportTicket[];
}

const SupportDashboard: React.FC<SupportDashboardProps> = ({ tickets }) => {
  // Calculate ticket metrics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in-progress').length;
  const waitingTickets = tickets.filter(ticket => ticket.status === 'waiting').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  
  // Calculate resolution rate
  const resolutionRate = totalTickets ? (resolvedTickets / totalTickets * 100).toFixed(1) : '0.0';
  
  // Calculate average resolution time (in hours)
  const calculateAvgResolutionTime = () => {
    const resolvedTicketsArray = tickets.filter(ticket => ticket.status === 'resolved');
    
    if (resolvedTicketsArray.length === 0) return '0.0';
    
    const totalHours = resolvedTicketsArray.reduce((total, ticket) => {
      const created = new Date(ticket.createdAt).getTime();
      const updated = new Date(ticket.updatedAt).getTime();
      const hours = (updated - created) / (1000 * 60 * 60);
      return total + hours;
    }, 0);
    
    return (totalHours / resolvedTicketsArray.length).toFixed(1);
  };
  
  const avgResolutionTime = calculateAvgResolutionTime();
  
  // Calculate tickets by priority
  const urgentTickets = tickets.filter(ticket => ticket.priority === 'urgent').length;
  const highTickets = tickets.filter(ticket => ticket.priority === 'high').length;
  const mediumTickets = tickets.filter(ticket => ticket.priority === 'medium').length;
  const lowTickets = tickets.filter(ticket => ticket.priority === 'low').length;
  
  // Calculate tickets by category
  const technicalTickets = tickets.filter(ticket => ticket.category === 'technical').length;
  const billingTickets = tickets.filter(ticket => ticket.category === 'billing').length;
  const featureTickets = tickets.filter(ticket => ticket.category === 'feature').length;
  const onboardingTickets = tickets.filter(ticket => ticket.category === 'onboarding').length;
  const otherTickets = tickets.filter(ticket => ticket.category === 'other').length;
  
  // Recent tickets
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-500">Total Tickets</h4>
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
              <HelpCircle size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold">{totalTickets}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-500">Open Tickets</h4>
            <div className="bg-amber-100 text-amber-600 p-2 rounded-full">
              <AlertCircle size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold">{openTickets + inProgressTickets + waitingTickets}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-500">Resolution Rate</h4>
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <CheckCircle size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold">{resolutionRate}%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-500">Avg. Resolution Time</h4>
            <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
              <Clock size={18} />
            </div>
          </div>
          <p className="text-2xl font-bold">{avgResolutionTime} hrs</p>
        </div>
      </div>
      
      {/* Ticket status breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tickets by Status</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Open</span>
                </div>
                <span className="text-sm text-gray-500">{openTickets}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${totalTickets ? (openTickets / totalTickets * 100) : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <span className="text-sm text-gray-500">{inProgressTickets}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${totalTickets ? (inProgressTickets / totalTickets * 100) : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Waiting</span>
                </div>
                <span className="text-sm text-gray-500">{waitingTickets}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${totalTickets ? (waitingTickets / totalTickets * 100) : 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Resolved</span>
                </div>
                <span className="text-sm text-gray-500">{resolvedTickets}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${totalTickets ? (resolvedTickets / totalTickets * 100) : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tickets by Priority</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <div className="flex items-center mb-1">
                <AlertTriangle size={16} className="text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-800">Urgent</span>
              </div>
              <p className="text-2xl font-bold text-red-900">{urgentTickets}</p>
              <p className="text-xs text-red-600 mt-1">
                {totalTickets ? ((urgentTickets / totalTickets) * 100).toFixed(1) : '0.0'}% of total
              </p>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
              <div className="flex items-center mb-1">
                <AlertCircle size={16} className="text-amber-500 mr-1" />
                <span className="text-sm font-medium text-amber-800">High</span>
              </div>
              <p className="text-2xl font-bold text-amber-900">{highTickets}</p>
              <p className="text-xs text-amber-600 mt-1">
                {totalTickets ? ((highTickets / totalTickets) * 100).toFixed(1) : '0.0'}% of total
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-center mb-1">
                <HelpCircle size={16} className="text-blue-500 mr-1" />
                <span className="text-sm font-medium text-blue-800">Medium</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{mediumTickets}</p>
              <p className="text-xs text-blue-600 mt-1">
                {totalTickets ? ((mediumTickets / totalTickets) * 100).toFixed(1) : '0.0'}% of total
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center mb-1">
                <CheckCircle size={16} className="text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-800">Low</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{lowTickets}</p>
              <p className="text-xs text-green-600 mt-1">
                {totalTickets ? ((lowTickets / totalTickets) * 100).toFixed(1) : '0.0'}% of total
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent tickets */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Support Tickets</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {ticket.id.replace('ticket-', '#')}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                    <div className="text-xs text-gray-500">{ticket.customerId}</div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {ticket.subject}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-800">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                      ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                      ticket.status === 'waiting' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                      ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                      ticket.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View all tickets →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;