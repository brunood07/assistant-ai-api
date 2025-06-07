import { Encrypter } from "../../domain/user/application/cryptography/encrypter"
import jwt from 'jsonwebtoken'

export class JwtEncrypter implements Encrypter {

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' })
  }

  async verify(token: string): Promise<Record<string, unknown>> {
    return jwt.verify(token, 'secretKey') as Record<string, unknown>
  }
}