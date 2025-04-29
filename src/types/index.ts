export interface Lead {
  id: string;
  companyName: string;
  location: string;
  employees: number;
  techStack: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  icpScore: number;
  industry: string;
  lastContacted: string | null;
  status: 'new' | 'contacted' | 'qualified' | 'opportunity' | 'customer' | 'lost';
  notes: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  status: 'draft' | 'active' | 'paused' | 'completed';
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
  emailsReplied: number;
  leads: string[]; // Lead IDs
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  campaignId: string;
  sequencePosition: number;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'waiting' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  category: 'technical' | 'billing' | 'feature' | 'onboarding' | 'other';
  relatedSKUs: string[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  compatibleWith: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentType?: 'demo' | 'onboarding' | 'support' | 'sales';
  content: string;
  timestamp: string;
  sessionId: string;
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  agentType: 'leadGen' | 'outbound' | 'demo' | 'support';
  queriesHandled: number;
  successRate: number;
  avgResponseTime: number;
  date: string;
}

export interface DashboardMetrics {
  newLeads: number;
  qualifiedLeads: number;
  activeCampaigns: number;
  openSupportTickets: number;
  resolvedTickets: number;
  avgResolutionTime: number;
  leadConversionRate: number;
  demoCompletionRate: number;
}