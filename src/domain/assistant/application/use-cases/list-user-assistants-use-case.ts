import { left, right } from "../../../../core/either";
import { UsersRepository } from "../../../user/application/repositories/users-repository";
import { ResourceNotFoundError } from "../../../user/application/use-cases/errors/resrouce-not-found-error";
import { AsssitantPermissionRepository } from "../repositories/assistant-permission-repository";

export class ListUserAssistantsUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly assistantPermissionRepository: AsssitantPermissionRepository
  ) { }

  execute = async (userId: string) => {
    const userExists = this.usersRepository.findById(userId);
    if (!userExists) return left(new ResourceNotFoundError('user'));

    var permissions = this.assistantPermissionRepository.listUserPermissions(userId);

    return right({
      permissions
    });
  }
}