import { Agent, AgentConfig, AgentContext, AgentResponse, AgentTask } from './types';

export abstract class BaseAgent implements Agent {
  config: AgentConfig;
  context: AgentContext;

  constructor(config: AgentConfig) {
    this.config = config;
    this.context = {
      config,
      state: {},
      metadata: {}
    };
  }

  async initialize(): Promise<void> {
    // Initialize agent-specific resources
    await this.onInitialize();
  }

  async execute(task: AgentTask): Promise<AgentResponse> {
    try {
      // Update task status
      task.status = 'in_progress';
      task.updatedAt = new Date();

      // Execute the task
      const result = await this.onExecute(task);

      // Update task status
      task.status = 'completed';
      task.updatedAt = new Date();

      return {
        success: true,
        data: result,
        metadata: {
          executionTime: new Date().getTime() - task.createdAt.getTime()
        }
      };
    } catch (error) {
      task.status = 'failed';
      task.updatedAt = new Date();

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        metadata: {
          executionTime: new Date().getTime() - task.createdAt.getTime()
        }
      };
    }
  }

  async cleanup(): Promise<void> {
    // Clean up agent-specific resources
    await this.onCleanup();
  }

  // Abstract methods to be implemented by concrete agents
  protected abstract onInitialize(): Promise<void>;
  protected abstract onExecute(task: AgentTask): Promise<any>;
  protected abstract onCleanup(): Promise<void>;
} 