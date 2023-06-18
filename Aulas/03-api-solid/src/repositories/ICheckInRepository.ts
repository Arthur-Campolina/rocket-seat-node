import { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInRepositoy {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  getById(id: string): Promise<CheckIn | null>;
  getByUserOnADate(userId: string): Promise<CheckIn | null>;
  getAllByUser(userId: string, page: number): Promise<CheckIn[]>;
  getNumberCheckinsByUser(userId: string): Promise<number>;
  update(checkIn: CheckIn): Promise<CheckIn>;
}
