import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import WelcomeModal from './components/common/WelcomeModal';
import DashboardView from './components/dashboard/DashboardView';
import LeadGenView from './components/leadGen/LeadGenView';
import LeadExpansionView from './components/leadExp/LeadExpansionView';
import OutboundView from './components/outbound/OutboundView';
import DemoView from './components/demo/DemoView';
import SupportView from './components/support/SupportView';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close welcome modal
  const closeWelcomeModal = () => {
    setShowWelcomeModal(false);
  };
  
  // Close sidebar when a module is selected on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [activeModule]);
  
  // Render active module
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView />;
      case 'lead-generation':
        return <LeadGenView />;
      case 'lead-expansion':
        return <LeadExpansionView />;
      case 'outbound-campaign':
        return <OutboundView />;
      case 'demo-assistant':
        return <DemoView />;
      case 'support-agent':
        return <SupportView />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <p className="text-gray-600">Platform settings and configuration</p>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <Sidebar
        isOpen={sidebarOpen}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />
      
      <div className={`transition-all duration-300 pt-16 ${sidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'}`}>
        <main className="p-4 md:p-8">
          {renderActiveModule()}
        </main>
      </div>
      
      <WelcomeModal isOpen={showWelcomeModal} onClose={closeWelcomeModal} />
    </div>
  );
}

export default App;