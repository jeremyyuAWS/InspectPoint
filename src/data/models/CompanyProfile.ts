export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  subIndustry: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  size: {
    employees: number;
    revenue: number;
    annualGrowth: number;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedIn?: string;
  };
  techStack: string[];
  icpScore: number;
  lastUpdated: Date;
  metadata: {
    [key: string]: any;
  };
}

export interface CompanyProfileGeneratorConfig {
  minEmployees: number;
  maxEmployees: number;
  minRevenue: number;
  maxRevenue: number;
  industries: string[];
  subIndustries: Record<string, string[]>;
  locations: {
    states: string[];
    cities: Record<string, string[]>;
  };
  techStackOptions: string[];
} 