import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInRepositoy } from "../ICheckInRepository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

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

  async findByUserOnADate(userId: string) {
    const now = new Date();
    const startOfTheDay = dayjs(now).startOf("date");
    const endOfTheDay = dayjs(now).endOf("date");

    const checkIn = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
      return checkIn.user_id === userId && isOnSameDate;
    });
    if (checkIn) return checkIn;
    return null;
  }
}
