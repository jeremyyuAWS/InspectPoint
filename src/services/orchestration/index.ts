import { AgentTask } from '../../agents/types';
import { databaseService } from '../database';
import { storageService } from '../storage';

export class OrchestrationService {
  private tasks: Map<string, AgentTask> = new Map();
  private runningTasks: Set<string> = new Set();

  async createTask(task: Omit<AgentTask, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<AgentTask> {
    const newTask: AgentTask = {
      ...task,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  async getTask(taskId: string): Promise<AgentTask | undefined> {
    return this.tasks.get(taskId);
  }

  async getTasks(status?: AgentTask['status']): Promise<AgentTask[]> {
    const tasks = Array.from(this.tasks.values());
    return status ? tasks.filter(task => task.status === status) : tasks;
  }

  async updateTask(taskId: string, updates: Partial<AgentTask>): Promise<AgentTask | undefined> {
    const task = this.tasks.get(taskId);
    if (!task) return undefined;

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date(),
    };

    this.tasks.set(taskId, updatedTask);
    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<boolean> {
    return this.tasks.delete(taskId);
  }

  async executeTask(taskId: string, agent: any): Promise<void> {
    const task = this.tasks.get(taskId);
    if (!task || this.runningTasks.has(taskId)) return;

    try {
      this.runningTasks.add(taskId);
      await this.updateTask(taskId, { status: 'in_progress' });

      const result = await agent.execute(task);
      await this.updateTask(taskId, {
        status: 'completed',
        metadata: {
          ...task.metadata,
          result,
        },
      });
    } catch (error) {
      await this.updateTask(taskId, {
        status: 'failed',
        metadata: {
          ...task.metadata,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } finally {
      this.runningTasks.delete(taskId);
    }
  }

  // Helper methods for specific task types
  async createCompanyProfileTask(companyData: any): Promise<AgentTask> {
    return this.createTask({
      type: 'company_profile',
      priority: 1,
      payload: companyData,
    });
  }

  async createCampaignInteractionTask(interactionData: any): Promise<AgentTask> {
    return this.createTask({
      type: 'campaign_interaction',
      priority: 2,
      payload: interactionData,
    });
  }

  async createFAQTask(faqData: any): Promise<AgentTask> {
    return this.createTask({
      type: 'faq',
      priority: 3,
      payload: faqData,
    });
  }

  async createTrainingPromptTask(promptData: any): Promise<AgentTask> {
    return this.createTask({
      type: 'training_prompt',
      priority: 4,
      payload: promptData,
    });
  }

  async createSKUTask(skuData: any): Promise<AgentTask> {
    return this.createTask({
      type: 'sku',
      priority: 5,
      payload: skuData,
    });
  }
}

export const orchestrationService = new OrchestrationService(); 