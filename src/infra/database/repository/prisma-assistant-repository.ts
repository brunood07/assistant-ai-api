import { AssistantRepository } from "domain/assistant/application/repositories/assistant-repository";
import { Assistant } from "domain/assistant/enterprise/entities/assistant";
import { prisma } from "../prisma";
import { AssistantMapper } from "../mappers/assistant-mapper";

export class PrismaAssistantRepository implements AssistantRepository {
  async create(data: Assistant): Promise<void> {
    await prisma.assistants.create({
      data: AssistantMapper.toDomain(data)
    })
  }

  async findByAssistantId(assistantId: string): Promise<Assistant | null> {
    const assistant = await prisma.assistants.findFirst({
      where: {
        assistantId
      }
    });

    if (!assistant) return null;

    return AssistantMapper.toPersistence(assistant);
  }

  async findByAssistantName(assistantName: string): Promise<Assistant | null> {
    const assistant = await prisma.assistants.findFirst({
      where: {
        assistantName
      }
    });

    if (!assistant) return null;

    return AssistantMapper.toPersistence(assistant);
  }
}