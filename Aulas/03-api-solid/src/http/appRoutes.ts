import { userController } from "./controllers/userController";
import { authenticateController } from "./controllers/authenticateController";
import { FastifyInstance, fastify } from "fastify";
import { profileController } from "./controllers/profileController";
import { verifyJWT } from "./middlewares/verify-jwt";

export const app = fastify();

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", userController);
  app.post("/sessions", authenticateController);

  // Authenticate
  app.get("/me", { onRequest: [verifyJWT] }, profileController);
}
