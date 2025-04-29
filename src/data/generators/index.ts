import { CompanyProfile, CompanyProfileGeneratorConfig } from '../models/CompanyProfile';
import { CampaignInteraction, CampaignInteractionGeneratorConfig } from '../models/CampaignInteraction';
import { FAQ, TrainingPrompt, FAQGeneratorConfig, TrainingPromptGeneratorConfig } from '../models/FAQ';
import { SKU, SKUGeneratorConfig } from '../models/SKU';
import { databaseService } from '../../services/database';
import { storageService } from '../../services/storage';
import { orchestrationService } from '../../services/orchestration';
import * as utils from './utils';

export class DataGeneratorService {
  private companyConfig: CompanyProfileGeneratorConfig;
  private campaignConfig: CampaignInteractionGeneratorConfig;
  private faqConfig: FAQGeneratorConfig;
  private trainingConfig: TrainingPromptGeneratorConfig;
  private skuConfig: SKUGeneratorConfig;

  constructor(
    companyConfig: CompanyProfileGeneratorConfig,
    campaignConfig: CampaignInteractionGeneratorConfig,
    faqConfig: FAQGeneratorConfig,
    trainingConfig: TrainingPromptGeneratorConfig,
    skuConfig: SKUGeneratorConfig
  ) {
    this.companyConfig = companyConfig;
    this.campaignConfig = campaignConfig;
    this.faqConfig = faqConfig;
    this.trainingConfig = trainingConfig;
    this.skuConfig = skuConfig;
  }

  // Company Profile Generation
  async generateCompanyProfiles(count: number): Promise<CompanyProfile[]> {
    const profiles: CompanyProfile[] = [];
    
    for (let i = 0; i < count; i++) {
      const profile = await this.generateCompanyProfile();
      profiles.push(profile);
      
      // Create a task to store the profile
      await orchestrationService.createCompanyProfileTask(profile);
    }
    
    return profiles;
  }

  private async generateCompanyProfile(): Promise<CompanyProfile> {
    const industry = utils.getRandomItem(this.companyConfig.industries);
    const subIndustry = utils.getRandomItem(this.companyConfig.subIndustries[industry]);
    const state = utils.getRandomItem(this.companyConfig.locations.states);
    const city = utils.getRandomItem(this.companyConfig.locations.cities[state]);
    const companyName = utils.generateCompanyName(industry);

    return {
      id: crypto.randomUUID(),
      name: companyName,
      industry,
      subIndustry,
      location: {
        address: utils.generateAddress(city, state),
        city,
        state,
        country: 'USA',
        zipCode: utils.getRandomItem(['10001', '90001', '60601', '77001', '33101']),
        coordinates: utils.generateCoordinates()
      },
      size: {
        employees: utils.generateEmployees(this.companyConfig.minEmployees, this.companyConfig.maxEmployees),
        revenue: utils.generateRevenue(this.companyConfig.minRevenue, this.companyConfig.maxRevenue),
        annualGrowth: utils.generateAnnualGrowth()
      },
      contact: {
        email: utils.generateEmail(companyName),
        phone: utils.generatePhoneNumber(),
        website: utils.generateWebsite(companyName),
        linkedIn: `https://linkedin.com/company/${companyName.toLowerCase().replace(/\s+/g, '-')}`
      },
      techStack: utils.generateTechStack(this.companyConfig.techStackOptions),
      icpScore: utils.generateICPScore(),
      lastUpdated: new Date(),
      metadata: {}
    };
  }

  // Campaign Interaction Generation
  async generateCampaignInteractions(count: number): Promise<CampaignInteraction[]> {
    const interactions: CampaignInteraction[] = [];
    
    for (let i = 0; i < count; i++) {
      const interaction = await this.generateCampaignInteraction();
      interactions.push(interaction);
      
      // Create a task to store the interaction
      await orchestrationService.createCampaignInteractionTask(interaction);
    }
    
    return interactions;
  }

  private async generateCampaignInteraction(): Promise<CampaignInteraction> {
    const campaignType = utils.getRandomItem(this.campaignConfig.campaignTypes);
    const template = utils.getRandomItem(this.campaignConfig.emailTemplates[campaignType]);
    const sentAt = new Date();
    const openRate = utils.generateRate(this.campaignConfig.openRateRange.min, this.campaignConfig.openRateRange.max);
    const clickRate = utils.generateRate(this.campaignConfig.clickRateRange.min, this.campaignConfig.clickRateRange.max);
    const replyRate = utils.generateRate(this.campaignConfig.replyRateRange.min, this.campaignConfig.replyRateRange.max);

    return {
      id: crypto.randomUUID(),
      campaignId: crypto.randomUUID(),
      companyId: crypto.randomUUID(),
      sequence: {
        stage: utils.getRandomInt(1, 5),
        type: utils.getRandomItem(['initial', 'follow-up', 'reminder', 'closing']),
        template
      },
      email: {
        subject: `${campaignType}: ${template}`,
        body: `This is a ${campaignType} email about ${template}.`,
        sentAt,
        openedAt: utils.generateTimeToEvent(this.campaignConfig.minTimeToOpen, this.campaignConfig.maxTimeToOpen) > 0 
          ? new Date(sentAt.getTime() + utils.generateTimeToEvent(this.campaignConfig.minTimeToOpen, this.campaignConfig.maxTimeToOpen) * 60000)
          : undefined,
        clickedAt: utils.generateTimeToEvent(this.campaignConfig.minTimeToClick, this.campaignConfig.maxTimeToClick) > 0
          ? new Date(sentAt.getTime() + utils.generateTimeToEvent(this.campaignConfig.minTimeToClick, this.campaignConfig.maxTimeToClick) * 60000)
          : undefined,
        repliedAt: utils.generateTimeToEvent(this.campaignConfig.minTimeToReply, this.campaignConfig.maxTimeToReply) > 0
          ? new Date(sentAt.getTime() + utils.generateTimeToEvent(this.campaignConfig.minTimeToReply, this.campaignConfig.maxTimeToReply) * 60000)
          : undefined
      },
      metrics: {
        openRate,
        clickRate,
        replyRate,
        timeToOpen: utils.generateTimeToEvent(this.campaignConfig.minTimeToOpen, this.campaignConfig.maxTimeToOpen),
        timeToClick: utils.generateTimeToEvent(this.campaignConfig.minTimeToClick, this.campaignConfig.maxTimeToClick),
        timeToReply: utils.generateTimeToEvent(this.campaignConfig.minTimeToReply, this.campaignConfig.maxTimeToReply)
      },
      metadata: {}
    };
  }

  // FAQ Generation
  async generateFAQs(count: number): Promise<FAQ[]> {
    const faqs: FAQ[] = [];
    
    for (let i = 0; i < count; i++) {
      const faq = await this.generateFAQ();
      faqs.push(faq);
      
      // Create a task to store the FAQ
      await orchestrationService.createFAQTask(faq);
    }
    
    return faqs;
  }

  private async generateFAQ(): Promise<FAQ> {
    const category = utils.getRandomItem(this.faqConfig.categories);
    const subCategory = utils.getRandomItem(this.faqConfig.subCategories[category]);
    const difficulty = utils.getRandomItem(['beginner', 'intermediate', 'advanced']);

    return {
      id: crypto.randomUUID(),
      category,
      subCategory,
      question: `How do I ${utils.getRandomItem(['install', 'configure', 'troubleshoot', 'use'])} ${subCategory}?`,
      answer: `To ${utils.getRandomItem(['install', 'configure', 'troubleshoot', 'use'])} ${subCategory}, follow these steps...`,
      tags: utils.getRandomItems(this.faqConfig.tags, utils.getRandomInt(1, 3)),
      difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
      lastUpdated: new Date(),
      metadata: {}
    };
  }

  // Training Prompt Generation
  async generateTrainingPrompts(count: number): Promise<TrainingPrompt[]> {
    const prompts: TrainingPrompt[] = [];
    
    for (let i = 0; i < count; i++) {
      const prompt = await this.generateTrainingPrompt();
      prompts.push(prompt);
      
      // Create a task to store the prompt
      await orchestrationService.createTrainingPromptTask(prompt);
    }
    
    return prompts;
  }

  private async generateTrainingPrompt(): Promise<TrainingPrompt> {
    const type = utils.getRandomItem(this.trainingConfig.types);
    const scenario = utils.getRandomItem(this.trainingConfig.scenarios[type]);
    const difficulty = utils.getRandomItem(['beginner', 'intermediate', 'advanced']);

    return {
      id: crypto.randomUUID(),
      type: type as 'onboarding' | 'demo' | 'support',
      scenario,
      context: `${utils.getRandomItem(this.trainingConfig.contextTemplates)} ${scenario}`,
      expectedResponse: `${utils.getRandomItem(this.trainingConfig.responseTemplates)} ${scenario}`,
      variations: Array.from({ length: this.trainingConfig.variationCount }, () => 
        `${utils.getRandomItem(this.trainingConfig.responseTemplates)} ${scenario}`
      ),
      difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
      lastUpdated: new Date(),
      metadata: {}
    };
  }

  // SKU Generation
  async generateSKUs(count: number): Promise<SKU[]> {
    const skus: SKU[] = [];
    
    for (let i = 0; i < count; i++) {
      const sku = await this.generateSKU();
      skus.push(sku);
      
      // Create a task to store the SKU
      await orchestrationService.createSKUTask(sku);
    }
    
    return skus;
  }

  private async generateSKU(): Promise<SKU> {
    const category = utils.getRandomItem(this.skuConfig.categories);
    const subCategory = utils.getRandomItem(this.skuConfig.subCategories[category]);
    const manufacturer = utils.getRandomItem(this.skuConfig.manufacturers);
    const partNumber = utils.generatePartNumber(category, subCategory);

    const specifications: Record<string, any> = {};
    Object.entries(this.skuConfig.specificationTemplates).forEach(([key, template]) => {
      specifications[key] = utils.generateSpecification(template);
    });

    const compatibility = {
      compatibleWith: utils.getRandomItems(this.skuConfig.compatibilityRules.categories, 2),
      incompatibleWith: utils.getRandomItems(this.skuConfig.compatibilityRules.categories, 1),
      notes: `Compatible with ${utils.getRandomItem(this.skuConfig.compatibilityRules.categories)} systems`
    };

    const basePrice = utils.getRandomInt(this.skuConfig.pricing.minBasePrice, this.skuConfig.pricing.maxBasePrice);
    const discounts = this.skuConfig.pricing.discountTiers.map(tier => ({
      quantity: tier.quantity,
      price: basePrice * (1 - tier.percentage / 100)
    }));

    return {
      id: crypto.randomUUID(),
      partNumber,
      name: `${category} ${subCategory}`,
      description: utils.generateDescription(category, subCategory),
      category,
      subCategory,
      manufacturer,
      specifications,
      compatibility,
      pricing: {
        basePrice,
        currency: this.skuConfig.pricing.currency,
        discounts
      },
      inventory: {
        stock: utils.getRandomInt(this.skuConfig.inventory.minStock, this.skuConfig.inventory.maxStock),
        reorderPoint: utils.getRandomInt(this.skuConfig.inventory.minReorderPoint, this.skuConfig.inventory.maxReorderPoint),
        leadTime: utils.getRandomInt(this.skuConfig.inventory.minLeadTime, this.skuConfig.inventory.maxLeadTime)
      },
      metadata: {}
    };
  }
}

// Default configurations
const defaultCompanyConfig: CompanyProfileGeneratorConfig = {
  minEmployees: 10,
  maxEmployees: 1000,
  minRevenue: 100000,
  maxRevenue: 10000000,
  industries: ['Fire Protection', 'Security Systems', 'Building Automation'],
  subIndustries: {
    'Fire Protection': ['Alarm Systems', 'Sprinkler Systems', 'Fire Extinguishers'],
    'Security Systems': ['Access Control', 'Video Surveillance', 'Intrusion Detection'],
    'Building Automation': ['HVAC Control', 'Lighting Control', 'Energy Management']
  },
  locations: {
    states: ['CA', 'TX', 'NY', 'FL', 'IL'],
    cities: {
      'CA': ['Los Angeles', 'San Francisco', 'San Diego'],
      'TX': ['Houston', 'Dallas', 'Austin'],
      'NY': ['New York', 'Buffalo', 'Albany'],
      'FL': ['Miami', 'Orlando', 'Tampa'],
      'IL': ['Chicago', 'Springfield', 'Peoria']
    }
  },
  techStackOptions: ['Python', 'Java', 'C#', 'JavaScript', 'Ruby', 'PHP']
};

const defaultCampaignConfig: CampaignInteractionGeneratorConfig = {
  campaignTypes: ['Cold Outreach', 'Follow-up', 'Product Update', 'Event Invitation'],
  emailTemplates: {
    'Cold Outreach': ['Introduction', 'Value Proposition', 'Case Study'],
    'Follow-up': ['Check-in', 'Reminder', 'Last Chance'],
    'Product Update': ['New Feature', 'Bug Fix', 'Performance Improvement'],
    'Event Invitation': ['Webinar', 'Conference', 'Workshop']
  },
  minTimeToOpen: 5,
  maxTimeToOpen: 1440,
  minTimeToClick: 10,
  maxTimeToClick: 2880,
  minTimeToReply: 30,
  maxTimeToReply: 4320,
  openRateRange: { min: 20, max: 40 },
  clickRateRange: { min: 5, max: 15 },
  replyRateRange: { min: 1, max: 5 }
};

const defaultFAQConfig: FAQGeneratorConfig = {
  categories: ['Installation', 'Configuration', 'Troubleshooting', 'Billing'],
  subCategories: {
    'Installation': ['Hardware', 'Software', 'Network'],
    'Configuration': ['System Settings', 'User Management', 'Integration'],
    'Troubleshooting': ['Common Issues', 'Error Messages', 'Performance'],
    'Billing': ['Pricing', 'Invoicing', 'Refunds']
  },
  tags: ['beginner', 'intermediate', 'advanced', 'urgent'],
  difficultyDistribution: {
    beginner: 0.4,
    intermediate: 0.4,
    advanced: 0.2
  }
};

const defaultTrainingConfig: TrainingPromptGeneratorConfig = {
  types: ['onboarding', 'demo', 'support'],
  scenarios: {
    'onboarding': ['Account Setup', 'First Configuration', 'Basic Usage'],
    'demo': ['Product Tour', 'Feature Highlight', 'Use Case'],
    'support': ['Issue Resolution', 'Best Practices', 'Advanced Features']
  },
  contextTemplates: [
    'As a new user, I want to...',
    'During the demo, the customer asked about...',
    'The customer is experiencing an issue with...'
  ],
  responseTemplates: [
    'Here\'s how you can...',
    'Let me show you...',
    'The solution is to...'
  ],
  variationCount: 3,
  difficultyDistribution: {
    beginner: 0.3,
    intermediate: 0.5,
    advanced: 0.2
  }
};

const defaultSKUConfig: SKUGeneratorConfig = {
  categories: ['Fire Alarm', 'Smoke Detector', 'Control Panel', 'Accessory'],
  subCategories: {
    'Fire Alarm': ['Conventional', 'Addressable', 'Wireless'],
    'Smoke Detector': ['Ionization', 'Photoelectric', 'Dual Sensor'],
    'Control Panel': ['Basic', 'Advanced', 'Enterprise'],
    'Accessory': ['Battery', 'Mounting Bracket', 'Remote Display']
  },
  manufacturers: ['FireTech', 'SafetyFirst', 'AlarmPro', 'SecureGuard'],
  specificationTemplates: {
    'voltage': { type: 'number', range: { min: 12, max: 24 } },
    'battery_life': { type: 'number', range: { min: 1, max: 10 } },
    'wireless': { type: 'boolean' },
    'compatibility': { type: 'string', options: ['Basic', 'Advanced', 'Enterprise'] }
  },
  compatibilityRules: {
    categories: ['Fire Alarm', 'Control Panel'],
    rules: [
      {
        compatible: ['Conventional', 'Basic'],
        incompatible: ['Addressable', 'Advanced']
      },
      {
        compatible: ['Addressable', 'Advanced'],
        incompatible: ['Conventional', 'Basic']
      }
    ]
  },
  pricing: {
    minBasePrice: 50,
    maxBasePrice: 1000,
    currency: 'USD',
    discountTiers: [
      { quantity: 10, percentage: 5 },
      { quantity: 50, percentage: 10 },
      { quantity: 100, percentage: 15 }
    ]
  },
  inventory: {
    minStock: 0,
    maxStock: 1000,
    minReorderPoint: 10,
    maxReorderPoint: 100,
    minLeadTime: 1,
    maxLeadTime: 14
  }
};

export const dataGeneratorService = new DataGeneratorService(
  defaultCompanyConfig,
  defaultCampaignConfig,
  defaultFAQConfig,
  defaultTrainingConfig,
  defaultSKUConfig
); 