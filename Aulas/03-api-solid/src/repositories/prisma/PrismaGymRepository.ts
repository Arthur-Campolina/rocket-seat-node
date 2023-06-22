import { Gym, Prisma } from "@prisma/client";
import { FindNearGymsParams, IGymRepository } from "../IGymRepository";
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
    const paginatedGyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });
    return paginatedGyms;
  }

  async findNearGyms({ latitude, longitude }: FindNearGymsParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT  
        * 
      FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }
}
