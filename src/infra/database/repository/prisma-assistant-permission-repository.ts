import { AsssitantPermissionRepository } from "domain/assistant/application/repositories/assistant-permission-repository";
import { AssistantPermission } from "domain/assistant/enterprise/entities/assistant-permission";
import { prisma } from "../prisma";
import { AssistantPermissionMapper } from "../mappers/assistant-permission-mapper";

export class PrismaAsssitantPermissionRepository implements AsssitantPermissionRepository {
  async create(data: AssistantPermission): Promise<void> {
    await prisma.assistantPermission.create({
      data: AssistantPermissionMapper.toDomain(data),
    });
  }

  async listUserPermissions(userId: string): Promise<AssistantPermission[]> {
    const permissions = await prisma.assistantPermission.findMany({
      where: {
        userId: userId,
      },
    });

    return permissions.map(AssistantPermissionMapper.toPersistence);
  }
}