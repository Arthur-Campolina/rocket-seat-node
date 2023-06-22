import { PrismaGymRepository } from "@/repositories/prisma/PrismaGymRepository";
import { CheckInService } from "../checkInService";
import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInRepository();
  const gymRepository = new PrismaGymRepository();
  const service = new CheckInService(checkInRepository, gymRepository);
  return service;
}
