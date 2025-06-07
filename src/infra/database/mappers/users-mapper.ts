import { User } from "../../../domain/user/enterprise/entities/user";
import { Prisma, User as PrismaUser } from '@prisma/client';

export class UsersMapper {
  static toEntity(data: User): Prisma.UserUncheckedCreateInput {
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      position: data.position,
    };
  }

  static toDomain(data: PrismaUser): User {
    return User.create({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      position: data.position
    });
  }
}