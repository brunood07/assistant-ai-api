import { compare, hash } from "bcryptjs"
import { HashComparer } from "../../domain/user/application/cryptography/hash-comparer"
import { HasherGenerator } from "../../domain/user/application/cryptography/hasher-generator"

export class BcryptHasher implements HashComparer, HasherGenerator {
  private HASH_SALT_LENGTH = 8

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, 15)
  }
}