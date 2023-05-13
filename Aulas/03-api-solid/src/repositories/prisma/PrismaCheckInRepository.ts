import { Prisma } from "@prisma/client";
import { ICheckInRepositoy } from "../ICheckInRepository";
import { prisma } from "@/lib/prisma";

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
}
