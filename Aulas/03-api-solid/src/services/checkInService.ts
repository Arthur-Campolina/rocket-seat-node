import { PrismaCheckInRepository } from "@/repositories/prisma/PrismaCheckInRepository";
import { CheckIn } from "@prisma/client";

interface CheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInRepository: PrismaCheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const hasUserCheckedInTodayAlready =
      await this.checkInRepository.findByUserOnADate(userId);
    if (hasUserCheckedInTodayAlready)
      throw new Error("User has already checked in today!");

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
