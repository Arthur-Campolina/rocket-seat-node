import { FastifyInstance } from "fastify";
import { env } from "../env/index.js";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { getErrorMessage } from "./getErrorMessage.js";

export  const genericErrorHandler = async(app: FastifyInstance) => {
    app.setErrorHandler((error, _request, reply) => {
      if (env.NODE_ENV !== "production") {
        console.error(error.message);
      } else {
        // TODO: send error to an external tool such as DataDog/NewRelic/Sentry
      }

      if (error instanceof ZodError) {
        return reply.status(StatusCodes.BAD_REQUEST).send({
          message: "Validation error!",
          error: error.format(),
        });
      }

      return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: getErrorMessage(StatusCodes.INTERNAL_SERVER_ERROR),
        description: error.message,
      });
    });
}