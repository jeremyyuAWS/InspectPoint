import { createClient } from '@supabase/supabase-js';
import { CompanyProfile } from '../../data/models/CompanyProfile';
import { CampaignInteraction } from '../../data/models/CampaignInteraction';
import { FAQ, TrainingPrompt } from '../../data/models/FAQ';
import { SKU } from '../../data/models/SKU';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {
  // Company Profiles
  async getCompanyProfiles(limit = 100, offset = 0): Promise<CompanyProfile[]> {
    const { data, error } = await supabase
      .from('company_profiles')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async createCompanyProfile(profile: CompanyProfile): Promise<CompanyProfile> {
    const { data, error } = await supabase
      .from('company_profiles')
      .insert([profile])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Campaign Interactions
  async getCampaignInteractions(limit = 100, offset = 0): Promise<CampaignInteraction[]> {
    const { data, error } = await supabase
      .from('campaign_interactions')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async createCampaignInteraction(interaction: CampaignInteraction): Promise<CampaignInteraction> {
    const { data, error } = await supabase
      .from('campaign_interactions')
      .insert([interaction])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // FAQs
  async getFAQs(limit = 100, offset = 0): Promise<FAQ[]> {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async createFAQ(faq: FAQ): Promise<FAQ> {
    const { data, error } = await supabase
      .from('faqs')
      .insert([faq])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Training Prompts
  async getTrainingPrompts(limit = 100, offset = 0): Promise<TrainingPrompt[]> {
    const { data, error } = await supabase
      .from('training_prompts')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async createTrainingPrompt(prompt: TrainingPrompt): Promise<TrainingPrompt> {
    const { data, error } = await supabase
      .from('training_prompts')
      .insert([prompt])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // SKUs
  async getSKUs(limit = 100, offset = 0): Promise<SKU[]> {
    const { data, error } = await supabase
      .from('skus')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  }

  async createSKU(sku: SKU): Promise<SKU> {
    const { data, error } = await supabase
      .from('skus')
      .insert([sku])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const databaseService = new DatabaseService(); 