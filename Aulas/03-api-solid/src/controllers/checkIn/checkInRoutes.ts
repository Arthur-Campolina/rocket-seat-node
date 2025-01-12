import { verifyJWT } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { checkInController } from "./checkInController";
import { getCheckInByUserController } from "./getCheckInByUserController";
import { getNumberCheckInsController } from "./getNumberCheckInsController";
import { validateCheckInController } from "./validateCheckInController";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", getCheckInByUserController);
  app.get("/check-ins/metrics", getNumberCheckInsController);
  app.post("/gyms/:gymId/check-in", checkInController);
  app.patch("/check-ins/:checkInId/validate", validateCheckInController);
}
