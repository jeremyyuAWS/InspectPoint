export interface FAQ {
  id: string;
  category: string;
  subCategory: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: Date;
  metadata: {
    [key: string]: any;
  };
}

export interface TrainingPrompt {
  id: string;
  type: 'onboarding' | 'demo' | 'support';
  scenario: string;
  context: string;
  expectedResponse: string;
  variations: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: Date;
  metadata: {
    [key: string]: any;
  };
}

export interface FAQGeneratorConfig {
  categories: string[];
  subCategories: Record<string, string[]>;
  tags: string[];
  difficultyDistribution: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

export interface TrainingPromptGeneratorConfig {
  types: string[];
  scenarios: Record<string, string[]>;
  contextTemplates: string[];
  responseTemplates: string[];
  variationCount: number;
  difficultyDistribution: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
} 