import fastify from "fastify";
import { env } from "./infra/env";
import fastifyJwt from "@fastify/jwt";

function main() {
  const app = fastify();

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: env.JWT_TOKEN_EXPIRES_IN,
    },
  })

  app.listen({ port: env.PORT }, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}

main();