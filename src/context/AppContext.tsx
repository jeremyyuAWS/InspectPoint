import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lead } from '../types';

interface AppContextType {
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  selectedModule: string;
  setSelectedModule: (module: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>('lead-generation');

  return (
    <AppContext.Provider value={{ leads, setLeads, selectedModule, setSelectedModule }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 