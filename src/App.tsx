import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './components/base/DashboardLayout';
import LeadFunnel from './components/dashboard/LeadFunnel';
import LeadMetrics from './components/dashboard/LeadMetrics';
import LeadMap from './components/dashboard/LeadMap';
import ICPDistribution from './components/dashboard/ICPDistribution';
import IndustryDistribution from './components/dashboard/IndustryDistribution';
import CampaignManagement from './components/campaign/CampaignManagement';
import { generateMockLeads } from './services/mockData';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50';
  };

  return (
    <nav className="space-y-1">
      <Link
        to="/"
        className={`block px-4 py-2 text-sm font-medium rounded-md ${isActive('/')}`}
      >
        Lead Generation
      </Link>
      <Link
        to="/campaigns"
        className={`block px-4 py-2 text-sm font-medium rounded-md ${isActive('/campaigns')}`}
      >
        Campaign Management
      </Link>
      <Link
        to="/demo-support"
        className={`block px-4 py-2 text-sm font-medium rounded-md ${isActive('/demo-support')}`}
      >
        Demo & Support
      </Link>
      <Link
        to="/admin"
        className={`block px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin')}`}
      >
        Admin Analytics
      </Link>
    </nav>
  );
};

const LeadGenerationDashboard: React.FC = () => {
  const mockLeads = generateMockLeads(100);

  return (
    <div className="space-y-6">
      <LeadMetrics leads={mockLeads} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadFunnel leads={mockLeads} />
        <LeadMap leads={mockLeads} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ICPDistribution leads={mockLeads} />
        <IndustryDistribution leads={mockLeads} />
      </div>
    </div>
  );
};

const DemoSupportDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Demo & Support Dashboard</h2>
      <p className="text-gray-500">Coming soon...</p>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Analytics Dashboard</h2>
      <p className="text-gray-500">Coming soon...</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <DashboardLayout
          header={
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">InspectPoint Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          }
          sidebar={<Navigation />}
        >
          <Routes>
            <Route path="/" element={<LeadGenerationDashboard />} />
            <Route path="/campaigns" element={<CampaignManagement />} />
            <Route path="/demo-support" element={<DemoSupportDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </DashboardLayout>
      </AppProvider>
    </Router>
  );
};

export default App;