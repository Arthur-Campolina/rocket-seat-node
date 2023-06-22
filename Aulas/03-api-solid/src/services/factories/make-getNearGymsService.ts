import { PrismaGymRepository } from "@/repositories/prisma/PrismaGymRepository";
import { GetNearGymsService } from "../getNearGymsService";

export function makeGetNearGymsService() {
  const gymRepository = new PrismaGymRepository();
  const service = new GetNearGymsService(gymRepository);
  return service;
}
