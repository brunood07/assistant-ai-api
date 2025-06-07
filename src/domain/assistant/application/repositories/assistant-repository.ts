import { Assistant } from "../../enterprise/entities/assistant";

export interface AssistantRepository {
  create(data: Assistant): Promise<void>;
  findByAssistantId(assistantId: string): Promise<Assistant | null>;
  findByAssistantName(assistantName: string): Promise<Assistant | null>;
}