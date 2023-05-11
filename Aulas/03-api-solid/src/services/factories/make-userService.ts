import { PrismaUserRepository } from "@/repositories/prisma/userRepository";
import { UserService } from "../userService";

export function makeUserService() {
  const userRepository = new PrismaUserRepository();
  const userService = new UserService(userRepository);
  return userService;
}
