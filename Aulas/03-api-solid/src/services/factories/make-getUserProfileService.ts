import { PrismaUserRepository } from "@/repositories/prisma/PrismaUserRepository";
import { GetUserProfileService } from "../getUserProfileService";

export function makeGetUserProfileService() {
  const userRepository = new PrismaUserRepository();
  const service = new GetUserProfileService(userRepository);
  return service;
}
