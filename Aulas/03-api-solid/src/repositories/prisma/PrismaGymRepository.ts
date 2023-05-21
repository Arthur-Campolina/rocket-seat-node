import { Prisma } from "@prisma/client";
import { IGymRepository } from "../IGymRepository";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements IGymRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });
    return gym;
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    });
    return gym;
  }
}
