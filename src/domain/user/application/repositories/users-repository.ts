import { User } from "../../enterprise/entities/user";

export interface UsersRepository {
  create(data: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}