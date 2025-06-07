import { Either, left, right } from "../../../../core/either";
import { Encrypter } from "../cryptography/encrypter";
import { HashComparer } from "../cryptography/hash-comparer";
import { UsersRepository } from "../repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resrouce-not-found-error";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
    refreshToken: string;
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) { }

  execute = async (data: AuthenticateUserUseCaseRequest) => {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);
    if (!user) return left(new ResourceNotFoundError("user"));

    const isPasswordValid = await this.hashComparer.compare(password, user.password);
    if (!isPasswordValid) return left(new WrongCredentialsError());

    const accessToken = await this.encrypter.encrypt({
      sub: user.id
    });

    const refreshToken = await this.encrypter.encrypt({
      sub: user.id,
      isRefreshToken: true
    });

    return right({
      accessToken,
      refreshToken
    })
  }
}