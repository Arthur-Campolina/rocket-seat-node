import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";
import { ValidateCheckInService } from "../validateCheckInService";

export function makeValidateCheckInsService() {
  const checkInRepository = new PrismaCheckInRepository();
  const service = new ValidateCheckInService(checkInRepository);
  return service;
}
