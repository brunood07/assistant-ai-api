import { UsersRepository } from "../../../domain/user/application/repositories/users-repository";
import { User } from "../../../domain/user/enterprise/entities/user";
import { prisma } from "infra/database/prisma";
import { UsersMapper } from "../mappers/users-mapper";

export class PrismaUsersRepository implements UsersRepository {

  async create(data: User): Promise<void> {
    await prisma.user.create({
      data: UsersMapper.toEntity(data)
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) return null;
    return UsersMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    });

    if (!user) return null;
    return UsersMapper.toDomain(user);
  }
}