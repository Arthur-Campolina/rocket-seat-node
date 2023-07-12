import { authenticateController } from "./authenticateController";
import { FastifyInstance, fastify } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { userController } from "./userController";
import { profileController } from "./profileController";

export const app = fastify();

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", userController);
  app.post("/sessions", authenticateController);

  // Authenticate
  app.get("/me", { onRequest: [verifyJWT] }, profileController);
}
