import { left, right } from "../../../../core/either";
import { User } from "../../enterprise/entities/user";
import { HasherGenerator } from "../cryptography/hasher-generator";
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hasherGenerator: HasherGenerator
  ) { }

  execute = async (data: CreateUserUseCaseRequest) => {
    const { firstName, lastName, email, password, position } = data;

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) return left(new UserAlreadyExistsError(email));

    const hashedPassword = await this.hasherGenerator.hash(password);
    const user = User.create({
      firstName,
      lastName,
      email,
      position,
      password: hashedPassword
    });

    await this.usersRepository.create(user);
    return right({
      user
    })
  }
}