import { Prisma, Assistants as PrismaAssistant } from "@prisma/client";
import { Assistant } from "domain/assistant/enterprise/entities/assistant";

export class AssistantMapper {
  static toDomain(raw: Assistant): Prisma.AssistantsUncheckedCreateInput {
    return {
      id: raw.id,
      assistantId: raw.assistantId,
      assistantName: raw.assistantName,
      assistantDescription: raw.assistantDescription,
    };
  }

  static toPersistence(assistant: PrismaAssistant): Assistant {
    return Assistant.create({
      id: assistant.id,
      assistantId: assistant.assistantId,
      assistantName: assistant.assistantName,
      assistantDescription: assistant.assistantDescription,
    });
  }
}