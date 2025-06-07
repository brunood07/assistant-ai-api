import { left, right } from "../../../../core/either";
import { UsersRepository } from "../../../user/application/repositories/users-repository";
import { ResourceNotFoundError } from "../../../user/application/use-cases/errors/resrouce-not-found-error";
import { AssistantPermission } from "../../enterprise/entities/assistant-permission";
import { AsssitantPermissionRepository } from "../repositories/assistant-permission-repository";
import { AssistantRepository } from "../repositories/assistant-repository";

export class LinkUserToAssistantUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly assistantsRepository: AssistantRepository,
    private readonly assistantPermissionRepository: AsssitantPermissionRepository
  ) { }

  execute = async (userId: string, assistantId: string) => {
    const userExists = this.usersRepository.findById(userId);
    if (!userExists) return left(new ResourceNotFoundError('user'));
    const assistantExists = this.assistantsRepository.findByAssistantId(assistantId);
    if (!assistantExists) return left(new ResourceNotFoundError('assistant'));

    const assistantPermission = AssistantPermission.create({
      userId,
      assistantId,
      assistant: null
    });

    this.assistantPermissionRepository.create(assistantPermission);

    return right({
      assistantPermission
    })
  }
}