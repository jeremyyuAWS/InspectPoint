export interface CampaignInteraction {
  id: string;
  campaignId: string;
  companyId: string;
  sequence: {
    stage: number;
    type: 'initial' | 'follow-up' | 'reminder' | 'closing';
    template: string;
  };
  email: {
    subject: string;
    body: string;
    sentAt: Date;
    openedAt?: Date;
    clickedAt?: Date;
    repliedAt?: Date;
  };
  metrics: {
    openRate: number;
    clickRate: number;
    replyRate: number;
    timeToOpen?: number;
    timeToClick?: number;
    timeToReply?: number;
  };
  metadata: {
    [key: string]: any;
  };
}

export interface CampaignInteractionGeneratorConfig {
  campaignTypes: string[];
  emailTemplates: Record<string, string[]>;
  minTimeToOpen: number;
  maxTimeToOpen: number;
  minTimeToClick: number;
  maxTimeToClick: number;
  minTimeToReply: number;
  maxTimeToReply: number;
  openRateRange: {
    min: number;
    max: number;
  };
  clickRateRange: {
    min: number;
    max: number;
  };
  replyRateRange: {
    min: number;
    max: number;
  };
} 