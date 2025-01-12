import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInRepositoy } from "../ICheckInRepository";
import { prisma } from "@/prisma/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements ICheckInRepositoy {
  async getById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
    return checkIn;
  }

  async update(checkIn: CheckIn) {
    const updatedCheckin = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });
    return updatedCheckin;
  }

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

  async getByUserOnADate(userId: string) {
    const now = new Date();
    const startOfTheDay = dayjs(now).startOf("date");
    const endOfTheDay = dayjs(now).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
    return checkIn;
  }

  async getAllByUser(userId: string, page: number) {
    if (page <= 0) page = 1;
    const paginatedCheckins = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20, // similar ao limit mySql
    });
    return paginatedCheckins;
  }

  async getNumberCheckinsByUser(userId: string) {
    const numberCheckIns = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
    return numberCheckIns;
  }
}
