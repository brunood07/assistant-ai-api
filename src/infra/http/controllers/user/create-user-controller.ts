import { CreateUserUseCase } from "domain/user/application/use-cases/create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { BcryptHasher } from "infra/cryptograph/bcrypt-hasher";
import { PrismaUsersRepository } from "infra/database/repository/prisma-users-repository";
import { z } from "zod";

const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  position: z.string(),
});

export class CreateUserController {

  handle = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const body = createUserSchema.parse(req.body);
      const sut = new CreateUserUseCase(new PrismaUsersRepository(), new BcryptHasher());
      const result = await sut.execute(body);
      return res.status(201).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}