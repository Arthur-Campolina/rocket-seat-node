import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma_client/prisma";
import { IUserRepository } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
