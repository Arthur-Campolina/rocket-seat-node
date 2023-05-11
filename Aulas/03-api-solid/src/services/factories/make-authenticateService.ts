import { PrismaUserRepository } from "@/repositories/prisma/userRepository";
import { AuthenticateService } from "@/services/authenticateService";

export function makeAuthenticateService() {
  const userRepository = new PrismaUserRepository();
  const userService = new AuthenticateService(userRepository);
  return userService;
}
