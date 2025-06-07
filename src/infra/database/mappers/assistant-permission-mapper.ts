import { AssistantPermission as PrismaAssistantPermission, Prisma } from "@prisma/client";
import { AssistantPermission } from "domain/assistant/enterprise/entities/assistant-permission";

export class AssistantPermissionMapper {
  static toDomain(raw: AssistantPermission): Prisma.AssistantPermissionUncheckedCreateInput {
    return {
      id: raw.id,
      assistantId: raw.assistantId,
      userId: raw.userId,
    };
  }

  static toPersistence(assistant: PrismaAssistantPermission): AssistantPermission {
    return AssistantPermission.create({
      id: assistant.id,
      assistantId: assistant.assistantId,
      userId: assistant.userId,
      assistant: null
    });
  }
}