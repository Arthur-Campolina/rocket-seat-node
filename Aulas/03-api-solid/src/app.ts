import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/appRoutes";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
app.register(appRoutes);

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
