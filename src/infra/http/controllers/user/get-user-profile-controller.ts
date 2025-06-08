import { GetUserProfileUseCase } from "domain/user/application/use-cases/get-user-profile-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "infra/database/repository/prisma-users-repository";

export class GetUserProfileController {

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const userId = req.user.sub;
      const sut = new GetUserProfileUseCase(new PrismaUsersRepository());
      const userProfile = await sut.execute(userId);
      return res.status(200).send(userProfile);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}