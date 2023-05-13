import { Prisma } from "@prisma/client";
import { ICheckInRepositoy } from "../ICheckInRepository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements ICheckInRepositoy {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: data.gym_id,
        user_id: data.user_id,
        validated_at: data.validated_at ? new Date(data.validated_at) : null,
      },
    });
    return checkIn;
  }

  async findByUserOnADate(userId: string) {
    const now = new Date();
    const startOfTheDay = dayjs(now).startOf("date").toISOString();
    const endOfTheDay = dayjs(now).endOf("date").toISOString();

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    });
    return checkIn;
  }
}
