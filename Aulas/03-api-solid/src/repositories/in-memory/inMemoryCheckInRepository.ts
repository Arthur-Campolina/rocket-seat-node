import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInRepositoy } from "../ICheckInRepository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements ICheckInRepositoy {
  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkIns.push(checkIn);
    return checkIn;
  }
}
