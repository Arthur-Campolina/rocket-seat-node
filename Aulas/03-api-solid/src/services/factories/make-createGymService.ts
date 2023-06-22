import { PrismaGymRepository } from "@/repositories/prisma/PrismaGymRepository";
import { CreateGymService } from "../createGymService";

export function makeCreateGymService() {
  const gymRepository = new PrismaGymRepository();
  const service = new CreateGymService(gymRepository);
  return service;
}
