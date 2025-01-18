import { FastifyInstance } from "fastify";
import { createGymController } from "./createGymController";
import { verifyJWT } from "@/middlewares/verify-jwt";
import { getGymsBySearchController } from "./getGymsBySearchController";
import { getNearGymsController } from "./getNearGymsController";
import { verifyUserRole } from "@/middlewares/verify-user-role";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", {onRequest: [verifyUserRole('ADMIN')]},createGymController);
  app.get("/gyms/search", getGymsBySearchController);
  app.get("/gyms/nearby", getNearGymsController);
}
