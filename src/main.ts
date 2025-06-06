import fastify from "fastify";
import { env } from "./infra/env";

function main() {
  const app = fastify();

  app.listen({ port: env.PORT }, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
}

main();