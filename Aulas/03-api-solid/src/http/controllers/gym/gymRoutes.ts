import { FastifyInstance } from "fastify";
import { createGymController } from "./createGymController";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { getGymsBySearchController } from "./getGymsBySearchController";
import { getNearGymsController } from "./getNearGymsController";

export async function gymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", createGymController);
  app.get("/gyms/search", getGymsBySearchController);
  app.get("/gyms/nearby", getNearGymsController);
}
