import { Either, left, right } from "../../../../core/either"
import { Encrypter } from "../cryptography/encrypter"
import { InvalidRefreshTokenError } from "./errors/invalid-refresh-token-error"

interface RefreshTokenUseCaseRequest {
  refreshToken: string
}

type RefreshTokenUseCaseResponse = Either<
  InvalidRefreshTokenError,
  {
    accessToken: string
    refreshToken: string
  }
>

export class RefreshTokenUseCase {
  constructor(private encrypter: Encrypter) { }

  execute = async ({ refreshToken }: RefreshTokenUseCaseRequest) => {
    try {
      const payload = await this.encrypter.verify(refreshToken)
      if (!payload.isRefreshToken) {
        return left(new InvalidRefreshTokenError())
      }

      const accessToken = await this.encrypter.encrypt({
        sub: payload.sub,
      })

      const newRefreshToken = await this.encrypter.encrypt({
        sub: payload.sub,
        isRefreshToken: true,
      })

      return right({
        accessToken,
        refreshToken: newRefreshToken,
      })
    } catch {
      return left(new InvalidRefreshTokenError())
    }
  }
}