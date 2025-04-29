import { Lead } from '../types';

export const generateMockLeads = (count: number): Lead[] => {
  const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'opportunity', 'customer', 'lost'];
  const industries = ['Fire Protection', 'Security Systems', 'Building Management', 'Electrical Contracting'];
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];

  return Array.from({ length: count }, (_, i) => ({
    id: `lead-${i}`,
    companyName: `Company ${i + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    employees: Math.floor(Math.random() * 1000) + 10,
    techStack: ['Fire Alarm Systems', 'Security Systems', 'Building Automation'],
    contactName: `Contact ${i + 1}`,
    contactEmail: `contact${i + 1}@company${i + 1}.com`,
    contactPhone: `+1-${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 9999)}`,
    icpScore: Math.floor(Math.random() * 100),
    industry: industries[Math.floor(Math.random() * industries.length)],
    lastContacted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    notes: `Notes for lead ${i + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

export const generateCampaignData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    date: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
    sent: Math.floor(Math.random() * 100) + 10,
    opened: Math.floor(Math.random() * 50) + 5,
    clicked: Math.floor(Math.random() * 20) + 2,
    replied: Math.floor(Math.random() * 10) + 1
  }));
}; 