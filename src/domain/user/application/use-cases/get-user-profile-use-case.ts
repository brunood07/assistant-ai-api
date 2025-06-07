import { left, right } from "../../../../core/either";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resrouce-not-found-error";

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) { }

  execute = async (userId: string) => {
    const user = await this.usersRepository.findById(userId);
    if (!user) return left(new ResourceNotFoundError("user"));

    return right({
      user
    })
  }
}