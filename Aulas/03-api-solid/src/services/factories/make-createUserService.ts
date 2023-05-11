import { PrismaUserRepository } from "@/repositories/prisma/userRepository";
import { CreateUserService } from "../createUserService";

export function makeUserService() {
  const userRepository = new PrismaUserRepository();
  const userService = new CreateUserService(userRepository);
  return userService;
}
