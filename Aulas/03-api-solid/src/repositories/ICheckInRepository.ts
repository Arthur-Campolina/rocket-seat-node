import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepositoy {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserOnADate(userId: string): Promise<CheckIn | null>;
}
