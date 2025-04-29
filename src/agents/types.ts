export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: string[];
}

export interface AgentContext {
  config: AgentConfig;
  state: Record<string, any>;
  metadata: Record<string, any>;
}

export interface AgentResponse {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}

export interface AgentTask {
  id: string;
  type: string;
  priority: number;
  payload: any;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Agent {
  config: AgentConfig;
  context: AgentContext;
  
  initialize(): Promise<void>;
  execute(task: AgentTask): Promise<AgentResponse>;
  cleanup(): Promise<void>;
} 