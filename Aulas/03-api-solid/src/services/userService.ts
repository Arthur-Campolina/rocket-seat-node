import { parseRequestBodyUser } from "@/utils/parseRequestBodyUser";
import { FastifyRequest } from "fastify";

export class UserService {
  constructor(private userRepository: any) {}

  async execute(request: FastifyRequest) {
    const body = await parseRequestBodyUser(request);
    const userExist = await this.userRepository.findByEmail(body.email);
    if (userExist) throw new Error("❌ User already exists!");
    const user = this.userRepository.create(body);
    return user;
  }
}
