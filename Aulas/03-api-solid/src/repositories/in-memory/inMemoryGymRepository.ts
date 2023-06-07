import { randomUUID } from "node:crypto";
import { Gym, Prisma } from "@prisma/client";
import { IGymRepository } from "../IGymRepository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymRepository implements IGymRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? "",
      phone: data.phone ?? "",
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === gymId);
    if (!gym) return null;
    return gym;
  }

  async findBySearch(query: string, page: number) {
    if (page <= 0) page = 1;
    const gyms = this.gyms
      .slice((page - 1) * 20, page * 20)
      .filter((gym) => gym.title === query);
    return gyms;
  }
}
