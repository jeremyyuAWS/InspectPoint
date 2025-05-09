import { 
  Lead, 
  Campaign, 
  EmailTemplate, 
  SupportTicket, 
  Product, 
  ChatMessage, 
  AgentPerformance, 
  DashboardMetrics 
} from '../types';

// Generate random date within the last 60 days
const randomRecentDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 60));
  return date.toISOString();
};

// Generate random locations across North America
const locations = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  'Dallas, TX', 'San Jose, CA', 'Toronto, ON', 'Montreal, QC',
  'Vancouver, BC', 'Calgary, AB', 'Ottawa, ON', 'Edmonton, AB'
];

// Generate random tech stacks
const techStacks = [
  'Legacy Systems', 'Cloud-Based', 'Mobile Apps', 'SaaS', 
  'Integrated Solutions', 'Web-Based', 'Enterprise', 'Custom',
  'IoT-Enabled', 'AI-Enhanced'
];

// Lead status distribution
const leadStatusDistribution = {
  new: 0.4,
  contacted: 0.25,
  qualified: 0.15,
  opportunity: 0.1,
  customer: 0.07,
  lost: 0.03
};

// Construction equipment categories and images
const constructionEquipment = [
  {
    id: 'excavator-1',
    name: 'Caterpillar 320 Hydraulic Excavator',
    category: 'Earth Moving',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60',
    price: 250000,
    financing: {
      term: '60 months',
      rate: '4.99%',
      monthlyPayment: 4720
    }
  },
  {
    id: 'bulldozer-1',
    name: 'Komatsu D65 Bulldozer',
    category: 'Earth Moving',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60',
    price: 180000,
    financing: {
      term: '48 months',
      rate: '5.25%',
      monthlyPayment: 4175
    }
  },
  {
    id: 'crane-1',
    name: 'Liebherr LTM 1100 Mobile Crane',
    category: 'Lifting',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60',
    price: 850000,
    financing: {
      term: '72 months',
      rate: '4.75%',
      monthlyPayment: 13500
    }
  },
  {
    id: 'loader-1',
    name: 'Volvo L120 Wheel Loader',
    category: 'Material Handling',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=60',
    price: 320000,
    financing: {
      term: '60 months',
      rate: '5.15%',
      monthlyPayment: 6075
    }
  }
];

// Role agent conversation templates
const roleAgentConversations = {
  demo: [
    {
      topic: 'Equipment Financing Overview',
      messages: [
        {
          sender: 'user',
          content: "I'm interested in financing options for construction equipment. Can you tell me more about what you offer?"
        },
        {
          sender: 'agent',
          content: "I'd be happy to help you explore our construction equipment financing options. We offer flexible terms and competitive rates for a wide range of equipment. What type of equipment are you looking to finance?"
        },
        {
          sender: 'user',
          content: "We're primarily interested in earth moving equipment, specifically excavators and bulldozers."
        },
        {
          sender: 'agent',
          content: "Great choice! We have excellent options for earth moving equipment. For example, our Caterpillar 320 Hydraulic Excavator is available with a 60-month term at 4.99% APR, with monthly payments of $4,720. Would you like to see more details about this model?"
        }
      ]
    }
  ],
  onboarding: [
    {
      topic: 'New Customer Onboarding',
      messages: [
        {
          sender: 'user',
          content: "Hi, we just signed up for your equipment financing platform. What's the next step?"
        },
        {
          sender: 'agent',
          content: "Welcome! I'm here to help you get started. First, let's set up your company profile. This will help us provide personalized financing options. Would you like to start with that?"
        },
        {
          sender: 'user',
          content: "Yes, that sounds good. What information do you need?"
        },
        {
          sender: 'agent',
          content: "We'll need your company's legal name, business type, years in operation, and annual revenue. This helps us determine the best financing terms for your business. Shall we begin?"
        }
      ]
    }
  ],
  support: [
    {
      topic: 'Technical Support',
      messages: [
        {
          sender: 'user',
          content: "I'm having trouble accessing my financing dashboard. The page keeps loading indefinitely."
        },
        {
          sender: 'agent',
          content: "I'm sorry to hear you're experiencing issues. Let's troubleshoot this step by step. First, could you tell me which browser you're using and if you've tried clearing your cache?"
        },
        {
          sender: 'user',
          content: "I'm using Chrome, and yes, I've cleared the cache. Still having the same issue."
        },
        {
          sender: 'agent',
          content: "Thank you for that information. Let's try a few more things. Could you check if you're able to access other pages on the platform? Also, are you seeing any specific error messages?"
        }
      ]
    }
  ],
  sales: [
    {
      topic: 'Equipment Sales Inquiry',
      messages: [
        {
          sender: 'user',
          content: "We're looking to expand our fleet with some new equipment. What are your current promotions?"
        },
        {
          sender: 'agent',
          content: "We have several attractive promotions running right now. For new equipment purchases, we're offering 0% down payment options and reduced interest rates for qualified buyers. What type of equipment are you interested in?"
        },
        {
          sender: 'user',
          content: "We're specifically looking at excavators and loaders."
        },
        {
          sender: 'agent',
          content: "Perfect! For excavators, we have a special promotion on the Caterpillar 320 model with 0% down and 4.99% APR for 60 months. For loaders, the Volvo L120 is currently available with a $10,000 instant rebate. Would you like to see the detailed specifications for either of these models?"
        }
      ]
    }
  ]
};

// Generate a mock lead
const generateMockLead = (id: number): Lead => {
  // Determine status based on distribution
  const rand = Math.random();
  let status: Lead['status'] = 'new';
  let cumulative = 0;
  
  for (const [key, value] of Object.entries(leadStatusDistribution)) {
    cumulative += value;
    if (rand <= cumulative) {
      status = key as Lead['status'];
      break;
    }
  }

  // Generate random ICP score between 1-100
  const icpScore = Math.floor(Math.random() * 100) + 1;
  
  return {
    id: `lead-${id}`,
    companyName: `Fire Protection ${id} Inc.`,
    location: locations[Math.floor(Math.random() * locations.length)],
    employees: Math.floor(Math.random() * 1000) + 5,
    techStack: Array(Math.floor(Math.random() * 3) + 1)
      .fill(0)
      .map(() => techStacks[Math.floor(Math.random() * techStacks.length)]),
    contactName: `Contact ${id}`,
    contactEmail: `contact${id}@fireprotection${id}.com`,
    contactPhone: `(${Math.floor(Math.random() * 900) + 100})-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    icpScore,
    industry: 'Fire Protection',
    lastContacted: status === 'new' ? null : randomRecentDate(),
    status,
    notes: `Notes for Fire Protection ${id} Inc.`,
    createdAt: randomRecentDate()
  };
};

// Generate mock campaigns
const generateMockCampaign = (id: number, leads: Lead[]): Campaign => {
  const emailsSent = Math.floor(Math.random() * 500) + 50;
  const emailsOpened = Math.floor(Math.random() * emailsSent);
  const emailsClicked = Math.floor(Math.random() * emailsOpened);
  const emailsReplied = Math.floor(Math.random() * emailsClicked);
  
  const leadIds = leads
    .slice(0, Math.floor(Math.random() * leads.length) + 10)
    .map(lead => lead.id);
  
  return {
    id: `campaign-${id}`,
    name: `Q${Math.floor(Math.random() * 4) + 1} Outreach Campaign`,
    description: `Targeted outreach for fire protection companies in ${locations[Math.floor(Math.random() * locations.length)]}`,
    startDate: randomRecentDate(),
    endDate: Math.random() > 0.7 ? randomRecentDate() : null,
    status: ['draft', 'active', 'paused', 'completed'][Math.floor(Math.random() * 4)] as Campaign['status'],
    emailsSent,
    emailsOpened,
    emailsClicked,
    emailsReplied,
    leads: leadIds
  };
};

// Generate support tickets
const generateMockSupportTicket = (id: number): SupportTicket => {
  const createdAt = randomRecentDate();
  const updatedAt = new Date(createdAt);
  updatedAt.setHours(updatedAt.getHours() + Math.floor(Math.random() * 72));
  
  const categories: SupportTicket['category'][] = ['technical', 'billing', 'feature', 'onboarding', 'other'];
  const statuses: SupportTicket['status'][] = ['open', 'in-progress', 'waiting', 'resolved'];
  const priorities: SupportTicket['priority'][] = ['low', 'medium', 'high', 'urgent'];
  
  return {
    id: `ticket-${id}`,
    customerId: `customer-${Math.floor(Math.random() * 100) + 1}`,
    customerName: `Customer ${Math.floor(Math.random() * 100) + 1}`,
    subject: `Support request #${id}`,
    description: `I need help with Firecat software regarding ${['installation', 'configuration', 'usage', 'error', 'integration'][Math.floor(Math.random() * 5)]}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    assignedTo: Math.random() > 0.3 ? `agent-${Math.floor(Math.random() * 5) + 1}` : null,
    createdAt: createdAt,
    updatedAt: updatedAt.toISOString(),
    category: categories[Math.floor(Math.random() * categories.length)],
    relatedSKUs: Array(Math.floor(Math.random() * 3))
      .fill(0)
      .map(() => `SKU-${Math.floor(Math.random() * 1000) + 1}`)
  };
};

// Generate chat messages for a session
const generateChatSession = (sessionId: string, messageCount: number): ChatMessage[] => {
  const messages: ChatMessage[] = [];
  const agentTypes: ('demo' | 'onboarding' | 'support' | 'sales')[] = ['demo', 'onboarding', 'support', 'sales'];
  const selectedAgentType = agentTypes[Math.floor(Math.random() * agentTypes.length)];
  
  const baseTime = new Date(randomRecentDate());
  
  // Select a random conversation template for the chosen agent type
  const selectedConversation = roleAgentConversations[selectedAgentType][Math.floor(Math.random() * roleAgentConversations[selectedAgentType].length)];
  
  // Use the template messages
  selectedConversation.messages.forEach((msg, index) => {
    const messageTime = new Date(baseTime);
    messageTime.setMinutes(baseTime.getMinutes() + index * 2);
    
    messages.push({
      id: `msg-${sessionId}-${index}`,
      sender: msg.sender === 'user' ? 'user' : 'agent',
      agentType: msg.sender === 'user' ? undefined : selectedAgentType,
      content: msg.content,
      timestamp: messageTime.toISOString(),
      sessionId
    });
  });
  
  return messages;
};

// Generate mock data
export const generateMockData = () => {
  // Generate leads
  const leads: Lead[] = Array(100)
    .fill(0)
    .map((_, idx) => generateMockLead(idx + 1));
  
  // Generate campaigns
  const campaigns: Campaign[] = Array(10)
    .fill(0)
    .map((_, idx) => generateMockCampaign(idx + 1, leads));
  
  // Generate email templates
  const emailTemplates: EmailTemplate[] = campaigns.flatMap(campaign => 
    Array(3).fill(0).map((_, idx) => ({
      id: `template-${campaign.id}-${idx + 1}`,
      name: `${campaign.name} - Email ${idx + 1}`,
      subject: `Let's improve your fire alarm design process - ${idx + 1}`,
      body: `Email body for ${campaign.name} sequence ${idx + 1}`,
      campaignId: campaign.id,
      sequencePosition: idx + 1
    }))
  );
  
  // Generate support tickets
  const supportTickets: SupportTicket[] = Array(50)
    .fill(0)
    .map((_, idx) => generateMockSupportTicket(idx + 1));
  
  // Generate products/SKUs
  const products: Product[] = [
    ...constructionEquipment.map(equipment => ({
      id: equipment.id,
      name: equipment.name,
      sku: `CE-${equipment.id}`,
      description: `${equipment.name} - Professional grade ${equipment.category.toLowerCase()} equipment with flexible financing options.`,
      category: equipment.category,
      compatibleWith: [],
      image: equipment.image,
      price: equipment.price,
      financing: equipment.financing
    })),
    ...Array(20)
      .fill(0)
      .map((_, idx) => ({
        id: `product-${idx + 1}`,
        name: `Firecat ${['Detector', 'Panel', 'Sensor', 'Alarm', 'Controller'][Math.floor(Math.random() * 5)]} ${idx + 1}`,
        sku: `FC-${Math.floor(1000 + Math.random() * 9000)}`,
        description: `Product description for Firecat item ${idx + 1}`,
        category: ['Hardware', 'Software', 'Service', 'Addon'][Math.floor(Math.random() * 4)],
        compatibleWith: Array(Math.floor(Math.random() * 5))
          .fill(0)
          .map(() => `FC-${Math.floor(1000 + Math.random() * 9000)}`)
      }))
  ];
  
  // Generate chat messages
  const chatSessions = Array(20)
    .fill(0)
    .map((_, idx) => generateChatSession(`session-${idx + 1}`, Math.floor(Math.random() * 10) + 4))
    .flat();
  
  // Generate agent performance metrics
  const agentPerformance: AgentPerformance[] = Array(30)
    .fill(0)
    .map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - idx);
      
      return {
        agentId: `agent-${Math.floor(Math.random() * 4) + 1}`,
        agentName: `Agent ${Math.floor(Math.random() * 4) + 1}`,
        agentType: ['leadGen', 'outbound', 'demo', 'support'][Math.floor(Math.random() * 4)] as AgentPerformance['agentType'],
        queriesHandled: Math.floor(Math.random() * 100) + 10,
        successRate: Math.random() * 0.4 + 0.6, // 60-100%
        avgResponseTime: Math.floor(Math.random() * 120) + 10, // 10-130 seconds
        date: date.toISOString().split('T')[0]
      };
    });
  
  // Generate dashboard metrics
  const dashboardMetrics: DashboardMetrics = {
    newLeads: Math.floor(Math.random() * 100) + 20,
    qualifiedLeads: Math.floor(Math.random() * 50) + 10,
    activeCampaigns: Math.floor(Math.random() * 5) + 1,
    openSupportTickets: Math.floor(Math.random() * 20) + 5,
    resolvedTickets: Math.floor(Math.random() * 100) + 30,
    avgResolutionTime: Math.floor(Math.random() * 48) + 2, // hours
    leadConversionRate: Math.random() * 0.2 + 0.05, // 5-25%
    demoCompletionRate: Math.random() * 0.3 + 0.6 // 60-90%
  };
  
  return {
    leads,
    campaigns,
    emailTemplates,
    supportTickets,
    products,
    chatSessions,
    agentPerformance,
    dashboardMetrics
  };
};

// Export mock data
export const mockData = generateMockData();