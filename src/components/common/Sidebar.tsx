import React from 'react';
import { 
  BarChart3, 
  Users, 
  Mail, 
  MessageCircleQuestion, 
  Headphones, 
  Settings, 
  NetworkIcon, 
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeModule, setActiveModule }) => {
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 size={20} /> },
    { id: 'lead-generation', name: 'Lead Generation', icon: <Users size={20} /> },
    { id: 'lead-expansion', name: 'Lead Expansion', icon: <NetworkIcon size={20} /> },
    { id: 'outbound-campaign', name: 'Outbound Campaign', icon: <Mail size={20} /> },
    { id: 'demo-assistant', name: 'Demo Assistant', icon: <MessageCircleQuestion size={20} /> },
    { id: 'support-agent', name: 'Support Agent', icon: <Headphones size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div 
      className={`fixed left-0 top-16 bottom-0 w-64 bg-gray-800 text-white z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span className="font-semibold">Firecat AI Platform</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Multi-agent sales & support</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {modules.map(module => (
              <li key={module.id}>
                <button
                  onClick={() => setActiveModule(module.id)}
                  className={`flex items-center w-full px-4 py-3 text-left transition duration-150 ease-in-out ${
                    activeModule === module.id
                      ? 'bg-red-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{module.icon}</span>
                  <span>{module.name}</span>
                  {module.id === 'demo-assistant' && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs">
                      2
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-xs text-gray-300 font-medium">Agent Performance</p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Success Rate</p>
                <p className="text-sm font-medium">87%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Response Time</p>
                <p className="text-sm font-medium">2.4s</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Queries</p>
                <p className="text-sm font-medium">1.2k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;