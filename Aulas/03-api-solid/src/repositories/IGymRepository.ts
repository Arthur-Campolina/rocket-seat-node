import { Gym, Prisma } from "@prisma/client";

export interface FindNearGymsParams {
  latitude: number;
  longitude: number;
}

export interface IGymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(gymId: string): Promise<Gym | null>;
  findNearGyms(params: FindNearGymsParams): Promise<Gym[]>;
  findBySearch(query: string, page: number): Promise<Gym[]>;
}
