import { GetCheckInsByUser } from "../getCheckInsByUserService";
import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";

export function makeGetCheckInsByUserService() {
  const checkInRepository = new PrismaCheckInRepository();
  const service = new GetCheckInsByUser(checkInRepository);
  return service;
}
