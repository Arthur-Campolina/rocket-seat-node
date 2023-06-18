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

  async getById(id: string) {
    const checkIn = this.checkIns.find((checkIn) => (checkIn.id = id));
    if (!checkIn) return null;
    return checkIn;
  }

  async update(checkIn: CheckIn) {
    const index = this.checkIns.findIndex((c) => (c.id = checkIn.id));
    const updatedCheckIn = checkIn;
    if (index >= 0) {
      this.checkIns[index] = updatedCheckIn;
    }
    return updatedCheckIn;
  }

  async getByUserOnADate(userId: string) {
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

  async getAllByUser(userId: string, page: number) {
    if (page <= 0) page = 1;
    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
    return checkIns;
  }

  async getNumberCheckinsByUser(userId: string) {
    const numberCheckIns = this.checkIns.filter(
      (checkIn) => checkIn.user_id === userId
    ).length;
    return numberCheckIns;
  }
}
