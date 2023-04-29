import fastify from "fastify";
import { userController } from "./controllers/userController";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(userController, {
  prefix: "/users",
});

app.setErrorHandler((error, _request, reply) => {
  if (env.NODE_ENV !== "production") {
    console.error(error.message);
  } else {
    // TODO: send error to an external tool such as DataDog/NewRelic/Sentry
  }
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error!",
      error: error.format(),
    });
  }
  return reply.status(500).send({
    message: "Internal server error!",
    error: error.message,
  });
});
