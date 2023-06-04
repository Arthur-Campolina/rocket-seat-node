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

  async findBySearch(query: string, page: number) {
    if (page <= 0) page = 1;
    const gyms = await prisma.gym.findMany();
    const paginatedGyms = gyms
      .slice((page - 1) * 20, page * 20)
      .filter((gym) => (gym.title = query));
    return paginatedGyms;
  }
}
