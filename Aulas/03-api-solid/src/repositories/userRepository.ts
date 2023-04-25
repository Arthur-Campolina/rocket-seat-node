import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findByEmail(email: string) {
    const isThereUserWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!isThereUserWithSameEmail;
  }
}
