import { PrismaUserRepository } from "@/repositories/prisma/PrismaUserRepository";
import { CreateUserService } from "../createUserService";

export function makeCreateUserService() {
  const userRepository = new PrismaUserRepository();
  const userService = new CreateUserService(userRepository);
  return userService;
}
