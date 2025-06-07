import { AssistantPermission } from "../../enterprise/entities/assistant-permission";

export interface AsssitantPermissionRepository {
  create(data: AssistantPermission): Promise<void>;
  listUserPermissions(userId: string): Promise<AssistantPermission[]>;
}