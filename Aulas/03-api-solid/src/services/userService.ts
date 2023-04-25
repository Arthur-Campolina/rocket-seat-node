import { IUserRepository } from "@/repositories/IUserRepository";
import { parseRequestBodyUser } from "@/utils/parseRequestBodyUser";
import { FastifyRequest } from "fastify";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(request: FastifyRequest) {
    const body = await parseRequestBodyUser(request);
    const userExist = await this.userRepository.findByEmail(body.email);
    if (userExist) throw new Error("❌ User already exists!");
    const user = await this.userRepository.create(body);
    return user;
  }
}
