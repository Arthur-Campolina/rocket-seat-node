import { IUserRepository } from "@/repositories/IUserRepository";

import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async execute(body: Prisma.UserCreateInput) {
    const userExist = await this.userRepository.findByEmail(body.email);
    if (userExist) throw new UserAlreadyExistsError();
    const hashedPassword = await hash(body.password, 6);
    body.password = hashedPassword;
    const user = await this.userRepository.create(body);
    return user;
  }
}