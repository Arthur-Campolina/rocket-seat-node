import { GetNumberCheckInsService } from "../getNumberCheckInsService";
import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";

export function makeGetNumberCheckInsService() {
  const checkInRepository = new PrismaCheckInRepository();
  const service = new GetNumberCheckInsService(checkInRepository);
  return service;
}
