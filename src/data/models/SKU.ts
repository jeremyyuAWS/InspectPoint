export interface SKU {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  manufacturer: string;
  specifications: {
    [key: string]: string | number | boolean;
  };
  compatibility: {
    compatibleWith: string[];
    incompatibleWith: string[];
    notes: string;
  };
  pricing: {
    basePrice: number;
    currency: string;
    discounts?: {
      quantity: number;
      price: number;
    }[];
  };
  inventory: {
    stock: number;
    reorderPoint: number;
    leadTime: number;
  };
  metadata: {
    [key: string]: any;
  };
}

export interface SKUGeneratorConfig {
  categories: string[];
  subCategories: Record<string, string[]>;
  manufacturers: string[];
  specificationTemplates: Record<string, {
    type: 'string' | 'number' | 'boolean';
    options?: (string | number | boolean)[];
    range?: {
      min: number;
      max: number;
    };
  }>;
  compatibilityRules: {
    categories: string[];
    rules: {
      compatible: string[];
      incompatible: string[];
    }[];
  };
  pricing: {
    minBasePrice: number;
    maxBasePrice: number;
    currency: string;
    discountTiers: {
      quantity: number;
      percentage: number;
    }[];
  };
  inventory: {
    minStock: number;
    maxStock: number;
    minReorderPoint: number;
    maxReorderPoint: number;
    minLeadTime: number;
    maxLeadTime: number;
  };
} 