import React from 'react';
import { AlertTriangle, Bell, HelpCircle, Menu, Settings, User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none mr-4 lg:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold text-gray-900">FireCat</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              AI Platform
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>
          
          <button
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Help"
          >
            <HelpCircle size={20} />
          </button>
          
          <button
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          
          <div className="border-l h-6 ml-2 border-gray-300"></div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-red-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@inspectpoint.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;