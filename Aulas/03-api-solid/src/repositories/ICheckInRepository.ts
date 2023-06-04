import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepositoy {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  getByUserOnADate(userId: string): Promise<CheckIn | null>;
  getAllByUser(userId: string, page: number): Promise<CheckIn[]>;
}
