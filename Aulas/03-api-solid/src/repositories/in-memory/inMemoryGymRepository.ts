import { randomUUID } from "node:crypto";
import { Gym, Prisma } from "@prisma/client";
import { IGymRepository } from "../IGymRepository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymRepository implements IGymRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ? data.id : randomUUID(),
      title: data.title,
      description: data.description ? data.description : "",
      phone: data.phone ? data.phone : "",
      latitude: data.latitude
        ? new Decimal(Number(data.latitude))
        : new Decimal(0),
      longitude: data.longitude
        ? new Decimal(Number(data.longitude))
        : new Decimal(0),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === gymId);
    if (!gym) return null;
    return gym;
  }
}
