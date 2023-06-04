import { Gym, Prisma } from "@prisma/client";

export interface IGymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(gymId: string): Promise<Gym | null>;
  findBySearch(query: string, page: number): Promise<Gym[]>;
}
